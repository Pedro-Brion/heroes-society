import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [DataModule]
})
export class UsersModule {}
