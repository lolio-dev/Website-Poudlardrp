import { PublicProfileDto } from '../dto/profile.dto';
import { ProfileSchema } from '../entity/profile.schema';

export const ProfileToPublic = (profile: ProfileSchema): PublicProfileDto => {
  return {
    uuid: profile.uuid,
    email: profile.email,
    gems: profile.gems,
    status: profile.status,
  };
};
