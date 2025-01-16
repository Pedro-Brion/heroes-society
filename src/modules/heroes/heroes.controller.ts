import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDTO } from './dto/create-hero.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  //GET -> /heroes
  @Get()
  all(): object {
    return this.heroesService.listAll();
  }

  //POST -> /heroes
  @Post()
  create(@Body() payload: CreateHeroDTO): object {
    return this.heroesService.create(payload);
  }
}
