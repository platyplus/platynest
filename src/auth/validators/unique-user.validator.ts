import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../users/user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'UserAlreadyExists', async: true })
@Injectable()
export class UniqueUserConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UserService) {}

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

export const UniqueUser = (validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string,
) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: validationOptions,
    constraints: [],
    validator: UniqueUserConstraint,
  });
};
