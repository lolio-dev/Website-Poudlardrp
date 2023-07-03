import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { UUID } from '../../../types/UUID';

export class CartDto {
  @ApiProperty()
  @IsString()
  cartId: string;

  @ApiProperty()
  @IsString()
  uuid: UUID;

  @ApiProperty()
  @IsNumber()
  productId: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}
