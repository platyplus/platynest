import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Json')
export class JsonScalar implements CustomScalar<any, any> {
  description = 'Json custom scalar type';

  parseValue(value: any): any {
    return JSON.parse(JSON.stringify(value));
  }

  serialize(value: any): any {
    return JSON.parse(JSON.stringify(value));
  }

  parseLiteral(ast: any): any {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value);
    }
    return JSON.parse(JSON.stringify(ast.value));
  }
}
