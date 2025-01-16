import { IsNotEmpty } from "class-validator";

export class CreateHeroDTO{
    @IsNotEmpty({ message: 'O nome verdadeiro do herói é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O nome de herói do herói é obrigatório' })
    hero_name: string;
}