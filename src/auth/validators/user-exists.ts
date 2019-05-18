import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUserAlreadyExists', async: true })
@Injectable()
export class IsUserAlreadyExistsConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: any, args: ValidationArguments) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'There user with the email $value already exists.';
  }
}

export const IsUserAlreadyExists = (validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string,
) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: validationOptions,
    constraints: [],
    validator: IsUserAlreadyExistsConstraint,
  });
};
