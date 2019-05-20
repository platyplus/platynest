import { createParamDecorator } from '@nestjs/common';

export const Profile = createParamDecorator((data, [root, args, ctx, info]) => {
  return ctx.req.user;
});
