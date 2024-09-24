import { Controller, Get, Query } from '@nestjs/common';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  //GET -> /heroes
  @Get()
  all(): object {
    return this.heroesService.listAll();
  }
}
