import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { IProfile, ISignIn } from '@/types/auth.interface';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() data: ISignIn, @Res({ passthrough: true }) res: any) {
    const { access_token } = await this.authService.signIn(data);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 2,
    });

    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user as IProfile;
  }
}
