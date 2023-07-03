import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ProductStatus } from '../../../types/enums/productStatus.enum';
import { Rarity } from '../../../types/Rarity';

@Entity('product')
export class ProductSchema {
  @PrimaryColumn()
  productId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  model: string;

  @Column()
  category: string;

  @Column()
  tags: string;

  @Column()
  rarity: Rarity;

  @Column({
    default: ProductStatus.ENABLE,
  })
  status: string;

  @Column({
    default: -1,
  })
  maximum: number;

  @Column()
  game_identifier: string;

  @Column()
  game_category: string;
}
