import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * TODO: explain
 */
@Injectable()
export class UpsertValidationPipe implements PipeTransform {
  async transform(entity: any, metadata: ArgumentMetadata) {
    // Dynamically determine the groups
    const groups = [];
    if (!entity.id) {
      groups.push('insert');
    }

    const { metatype } = metadata;
    // Transform to class with groups
    const entityClass = plainToClass(metatype, entity, { groups });
    // Validate with groups
    const errors = await validate(entityClass, { groups });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return entityClass;
  }
}
