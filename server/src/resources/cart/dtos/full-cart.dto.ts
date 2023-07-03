import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { UUID } from '../../../types/UUID';
import { ProductDto } from '../../products/dto/product.dto';

export class FullCartDto {
  @ApiProperty()
  product: ProductDto;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @IsString()
  uuid: UUID;

  @IsString()
  cartId: string;
}
