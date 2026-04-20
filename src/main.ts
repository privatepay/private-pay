import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'reflect-metadata';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: {
  hot?: { accept: () => void; dispose: (fn: () => void) => void };
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(helmet());

  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });

  app.set('trust proxy', 'loopback');

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }
}
void bootstrap();
