import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from './models/hero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroesService {
  constructor(@InjectRepository(Hero) private heroesRepo: Repository<Hero>) {}

  async listAll(): Promise<Hero[]> {
    return this.heroesRepo.find();
  }

  async create(payload: Partial<Hero>): Promise<Hero> {
    const hero = this.heroesRepo.create(payload);

    return this.heroesRepo.save(hero);
  }
}
