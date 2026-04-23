import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nResolver } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserLanguageResolver implements I18nResolver {
  constructor(private readonly jwtService: JwtService) {}

  resolve(
    context: ExecutionContext,
  ): string | string[] | Promise<string | string[] | undefined> | undefined {
    const request = context.switchToHttp().getRequest();

    if (request.user?.language) {
      return request.user.language;
    }

    const token = request.cookies?.access_token;
    if (token) {
      try {
        const payload: any = this.jwtService.decode(token);
        return payload?.language;
      } catch (e) {
        throw new NotFoundException('index.auth.LANGUAGE_NOT_FOUND');
      }
    }

    return undefined;
  }
}
