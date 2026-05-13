import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ISignIn } from '@/types/auth.interface';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async signIn(data: ISignIn): Promise<any> {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('index.auth.INVALID_CREDENTIALS'),
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.t('index.auth.INVALID_CREDENTIALS'),
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      language: user.language,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: this.i18n.t('index.auth.LOGIN_SUCCESS'),
    };
  }
  logout(res: any) {
    const message = this.i18n.t('index.auth.LOGOUT_SUCCESS');
    res.clearCookie('access_token');
    return message;
  }
}
