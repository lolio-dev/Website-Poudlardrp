import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProfileSchema } from '../../profile/entity/profile.schema';
import { UUID } from '../../../types/UUID';
import { PartnerCodeSchema } from 'src/resources/partner_code/entity/partner_code.schema';

@Entity('invoices')
export class InvoicesSchema {
  @PrimaryColumn()
  invoicesId: string;

  @Column()
  @ManyToOne(() => ProfileSchema, profile => profile.uuid)
  @JoinColumn({ name: 'uuid' })
  uuid: UUID;

  @Column()
  email: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  priceEuro: number;

  @Column()
  priceGems: number;

  @Column({default: null, nullable: true})
  @ManyToOne(() => PartnerCodeSchema, code => code.codeId)
  @JoinColumn({ name: 'codeId' })
  codeId?: string;

  @Column('date', { default: new Date().toISOString().slice(0, 19) })
  emitedAt: Date;

  @Column('date', {
    default: new Date().toISOString().slice(0, 19),
    nullable: true,
  })
  paidAt?: Date;

  @Column()
  status: string;
}
