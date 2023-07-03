import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductSchema } from '../../products/entity/product.schema';
import { UUID } from '../../../types/UUID';
import { ProfileSchema } from '../../profile/entity/profile.schema';

@Entity('cart')
export class CartSchema {
  @PrimaryColumn()
  cartId: string;

  @Column()
  @ManyToOne(() => ProfileSchema, profile => profile.uuid)
  @JoinColumn({ name: 'uuid' })
  uuid: UUID;

  @Column()
  @ManyToOne(() => ProductSchema, product => product.productId)
  @JoinColumn({ name: 'productId' })
  productId: string;

  @Column()
  quantity: number;
}
