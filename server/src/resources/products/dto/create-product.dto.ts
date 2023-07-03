import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Rarity } from '../../../types/Rarity';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  rarity: Rarity;

  @ApiProperty()
  @IsNumber()
  maximum: number | null;

  @ApiProperty()
  @IsString()
  game_identifier: string;

  @ApiProperty()
  game_category: string;
}
