import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from '../../../types/enums/role.enum';
import { Status } from '../../../types/enums/status.enum';
import { UUID } from '../../../types/UUID';

@Entity('profile')
export class ProfileSchema {
  @PrimaryColumn({ unique: true })
  uuid: UUID;

  @Column({ nullable: true })
  email: string;

  @Column({ default: Role.USER })
  role: string;

  @Column({ default: 0 })
  gems: number;

  @Column({ default: Status.INCOMPLETE })
  status: Status;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  sendAt?: Date;

  @Column({ nullable: true })
  stripeId?: string;

  @Column({ nullable: true })
  partnerStripeId?: string;
}
