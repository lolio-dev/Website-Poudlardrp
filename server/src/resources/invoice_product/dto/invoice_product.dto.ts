import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class InvoiceProductDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  productId?: string;

  @ApiProperty()
  @IsString()
  gemId?: string;

  @ApiProperty()
  @IsNumber()
  priceEuro: number;

  @ApiProperty()
  @IsNumber()
  priceGem: number;

  @ApiProperty()
  @IsInt()
  quantity: number;
}

export class CreateInvoiceProductDto {
  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  productId?: string;

  @ApiProperty()
  @IsString()
  gemId?: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}
