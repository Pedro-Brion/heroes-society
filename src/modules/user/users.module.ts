import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}