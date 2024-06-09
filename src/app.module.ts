import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from 'storage/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    UsersModule,
    DataModule,
  ],
})
export class AppModule {}
