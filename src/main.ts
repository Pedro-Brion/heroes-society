import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorConfig } from './config/error.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ErrorConfig.exeptionFactory,
    }),
  );
  await app.listen(3000);
}
bootstrap();
