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
import { I18nService } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

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

    return { message: this.i18n.t('index.auth.LOGIN_SUCCESS') };
  }

  @Post('logout')
  logout(@Request() req: any, @Res({ passthrough: true }) res: any) {
    const message = this.authService.logout(res);
    return { message: message };
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.sub, req.user);
  }
}
