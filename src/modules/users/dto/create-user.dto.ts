import {
  IsNotEmpty,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';


@ValidatorConstraint({ name: 'isNumberOrStringNumber' })
export class IsNumberOrStringNumber implements ValidatorConstraintInterface {
  validate(number: number | string): boolean {
    if (typeof number === 'number') return true;
    if (typeof number === 'string') return !isNaN(Number(number));
  }
}

export class CreateUserDTO {
}
