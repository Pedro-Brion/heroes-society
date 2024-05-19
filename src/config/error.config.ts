import {
  BadRequestException,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';

export class ErrorConfig {
  static exeptionFactory = (errors: ValidationError[]): HttpException => {
    const messages = {};
    errors.forEach(
      (error) => (messages[error.property] = Object.values(error.constraints)),
    );
    return new BadRequestException({
      data: messages,
      error: 'Bad Request',
      status: HttpStatus.BAD_REQUEST,
    });
  };
}
