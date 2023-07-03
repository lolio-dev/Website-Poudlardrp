import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProfileSchema } from '../../resources/profile/entity/profile.schema';

/**
 * Required to passed JWT Guard who injectprofilein request.user
 */
export const Profile = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as ProfileSchema;
});
