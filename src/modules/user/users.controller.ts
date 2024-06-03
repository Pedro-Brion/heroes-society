import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO, GetAllQueryDTO } from './dto/users.dto';
import { UsersService } from './user.service';
import { User } from './interfaces/users.types';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(@Query() query: GetAllQueryDTO): object {
    return this.usersService.getAll(query.search);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateUserDTO) {
    const user: User = body as User;
    user.isAdmin = false;
    user.id = Math.floor(Math.random() * 99999);
    this.usersService.create(user);
    return { data: user };
  }
}
