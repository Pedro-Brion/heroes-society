import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
//DTOS
import { ToggleUserAdminDTO } from './dto/admin-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetAllQueryDTO } from './dto/list-users.dto';
import { EntityNotFound } from 'src/config/expection.config';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  //GET -> /users
  @Get()
  all(@Query() query: GetAllQueryDTO): object {
    return this.usersService.listAll(query.search);
  }

  //GET -> /users/{id}
  @Get(':id')
  userById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.userById(id);
    } catch (err) {
      if (err instanceof EntityNotFound)
        throw new NotFoundException(err.message);
      else throw err;
    }
  }

  //POST /users/create
  @Post('create')
  create(@Body() body: CreateUserDTO) {
    const user: User = body as User;
    user.isAdmin = false;
    this.usersService.create(user);
    return { data: user };
  }

  //DELETE /users/remove/{id}
  @Delete('remove/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.deleteUser(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  //PATCH -> /users/toggle-admin/{id}
  @Patch('toggle-admin/:id')
  toggleAdmin(
    @Body() body: ToggleUserAdminDTO,
    @Param('id', ParseIntPipe) id: number,
  ): object {
    const secret = this.configService.get<string>('DB_PASSWORD');
    if (body.secret !== secret)
      throw new ForbiddenException('Secret not match');
    try {
      return this.usersService.toggleAdmin(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
