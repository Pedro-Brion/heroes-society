import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  hero_name: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  ocupation: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}

export const HeroRepository = 'HERO_REPOSITORY';
