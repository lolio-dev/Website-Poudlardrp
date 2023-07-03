import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProfileSchema } from '../../profile/entity/profile.schema';
import { UUID } from '../../../types/UUID';
import { InvoicesSchema } from '../../invoices/entity/invoices.schema';

@Entity('transactions')
export class TransactionsSchema {
  @PrimaryColumn()
  transactionsId: string;

  @Column()
  @ManyToOne(() => ProfileSchema, profile => profile.uuid)
  @JoinColumn({ name: 'uuid' })
  uuid: UUID;

  @Column()
  @ManyToOne(() => InvoicesSchema, invoices => invoices.invoicesId)
  @JoinColumn({ name: 'invoiceId' })
  invoiceId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  price: number;

  @Column()
  currency: string;

  @Column()
  source: string;

  @Column('date', { default: new Date().toISOString().slice(0, 19) })
  date: Date;

  @Column()
  commandId: string;
}
