import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ProductStatus } from '../../../types/enums/productStatus.enum';

@Entity('gem')
export class GemSchema {
  @PrimaryColumn()
  gemOfferId: string;

  @Column()
  gems: number;

  @Column()
  bonus: number;

  @Column('float')
  price: number;

  @Column()
  stripeId: string;

  @Column({ default: ProductStatus.ENABLE })
  status: string;
}
