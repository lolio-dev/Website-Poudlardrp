import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ProductSchema } from '../../products/entity/product.schema';
import { InvoicesSchema } from '../../invoices/entity/invoices.schema';
import { GemSchema } from '../../gems/entity/gem.schema';

@Entity('invoice_product')
export class InvoiceProductSchema {
  @PrimaryColumn()
  id: string;

  @Column()
  @ManyToOne(() => InvoicesSchema, invoices => invoices.invoicesId)
  @JoinColumn({ name: 'invoiceId' })
  invoiceId: string;

  @Column({ nullable: true })
  @ManyToOne(() => ProductSchema, product => product.productId)
  @JoinColumn({ name: 'productId' })
  productId?: string;

  @Column({ nullable: true })
  @ManyToOne(() => GemSchema, gem => gem.gemOfferId)
  @JoinColumn({ name: 'gemId' })
  gemId?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  priceEuro: number;

  @Column()
  priceGem: number;

  @Column()
  quantity: number;
}
