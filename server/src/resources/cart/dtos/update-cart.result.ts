import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { UpdateResult } from 'typeorm';

export class UpdateCartResult {
  @ApiProperty()
  @IsNumber()
  totalCartPrice: number;

  @ApiProperty()
  result: UpdateResult;

  @ApiProperty()
  @IsNumber()
  quantityOwned?: number;

  @ApiProperty()
  @IsNumber()
  quantityAvailable?: number;

  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty()
  @IsBoolean()
  totalPrice: number;
}
