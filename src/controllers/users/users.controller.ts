import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateUserBody, GetAllQuery } from './users.types';

@Controller('users')
export class UserController {
  @Get()
  getAll(@Query() query: GetAllQuery): object {
    console.log(query.test);

    return query;
  }

  @Post()
  create(@Body() body: CreateUserBody): object {
    return {
      result: 'okay',
      data: { body },
    };
  }
}
