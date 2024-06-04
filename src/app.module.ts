import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [UsersModule, DataModule],
})
export class AppModule {}
