import { IsNotEmpty, IsNumber } from "class-validator";

export interface GetAllQuery {
  test: string;
}

export class CreateUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
