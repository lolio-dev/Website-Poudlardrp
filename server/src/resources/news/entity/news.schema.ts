import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ProductStatus } from '../../../types/enums/productStatus.enum';

@Entity('news')
export class NewsSchema {
  @PrimaryColumn()
  newsId: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  text: string;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  image: string;

  @Column({ default: ProductStatus.ENABLE })
  status: string;
}
