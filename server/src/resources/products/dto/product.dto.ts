import { ApiProperty } from '@nestjs/swagger';
import { Rarity } from '../../../types/Rarity';

export class ProductDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  maximum: number;

  @ApiProperty()
  quantityOwned?: number;

  @ApiProperty()
  totalQuantityOwned?: number;

  @ApiProperty()
  quantityAvailable?: number;

  @ApiProperty()
  totalQuantityAvailable?: number;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  rarity: Rarity;

  @ApiProperty()
  game_identifier: string;

  @ApiProperty()
  game_category: string;
}
