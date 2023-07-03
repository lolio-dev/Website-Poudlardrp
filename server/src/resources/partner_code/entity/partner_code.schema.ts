import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProfileSchema } from '../../profile/entity/profile.schema';
import { UUID } from '../../../types/UUID';

@Entity('partner_code')
export class PartnerCodeSchema {
  @PrimaryColumn()
  codeId: string;

  @Column()
  @ManyToOne(() => ProfileSchema, profile => profile.uuid)
  @JoinColumn({ name: 'uuid' })
  uuid: UUID;

  @Column()
  percentage: number;

  @Column()
  discount: number;

  @Column()
  discount_stripe_id: string;

  @Column()
  status: string;
}
