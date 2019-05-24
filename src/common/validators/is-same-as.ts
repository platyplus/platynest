import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/** TODO: kept as an example but not used anymore
 * Validation decorator:
 * field1: string
 * @IsSameAs('field1')
 * field2: string
 *
 * the validation will pass if field1 === field2
 */
export const IsSameAs = (
  property: string,
  validationOptions?: ValidationOptions,
) => (object: object, propertyName: string) => {
  registerDecorator({
    name: 'isSameAs',
    target: object.constructor,
    propertyName,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue; // you can return a Promise<boolean> here as well, if you want to make async validation
      },
      defaultMessage(args: ValidationArguments) {
        return 'The fields $constraint1 and $property are not the same';
      },
    },
  });
};
