import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorConfig } from './config/error.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ErrorConfig.exeptionFactory,
    }),
  );
  app.use(cookieParser());
  const appPort = process.env.PORT || 3000;
  await app.listen(appPort);
}
bootstrap();
