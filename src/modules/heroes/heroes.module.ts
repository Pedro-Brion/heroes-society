import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './models/hero.entity';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
  imports: [TypeOrmModule.forFeature([Hero])],
  exports: [HeroesService],
})
export class HeroesModule {}
