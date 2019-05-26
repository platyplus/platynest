import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Profile = createParamDecorator((data, enhancers) => {
  try {
    // GraphQL request
    const [root, args, ctx, info] = enhancers;
    return ctx.req.user;
  } catch (e) {
    // REST request
    return enhancers.user;
  }
});
