import { IsEmail } from 'class-validator';
import { Status } from '../../../types/enums/status.enum';
import { UUID } from '../../../types/UUID';

export type CreateProfileDto = {
  uuid: UUID;
  email: string;
};

export type PublicProfileDto = {
  uuid: UUID;
  email: string;
  gems: number;
  status: Status;
};

export class RegisterEmailDto {
  @IsEmail()
  email: string;
}
