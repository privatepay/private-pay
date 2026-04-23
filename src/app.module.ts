import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { AppDataSource } from './db/data-source';
import { AuthModule } from './entities/auth/auth.module';
import { AuthGuard } from './entities/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './entities/auth/role.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as path from 'path';
import {
  I18nModule,
  AcceptLanguageResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { UserLanguageResolver } from './i18n/user-language.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      fallbacks: {
        'pt-*': 'pt',
        'en-*': 'en',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        UserLanguageResolver,
        new CookieResolver(['lang']),
        AcceptLanguageResolver,
      ],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserLanguageResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
