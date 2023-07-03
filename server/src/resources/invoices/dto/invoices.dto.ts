import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { UUID } from '../../../types/UUID';

export class InvoicesDto {
  @ApiProperty()
  @IsString()
  invoicesId: string;

  @ApiProperty()
  @IsString()
  uuid: UUID;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  priceEuro: number;

  @ApiProperty()
  @IsNumber()
  priceGems: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  codeId?: string = null;

  @ApiProperty()
  @IsDate()
  emitedAt: Date = new Date();

  @ApiProperty()
  @IsDate()
  paidAt?: Date = new Date();

  @ApiProperty()
  @IsString()
  status: string;
}

export class InvoicesCreateDto {
  @ApiProperty()
  @IsString()
  uuid: UUID;

  @ApiProperty()
  @IsNumber()
  priceEuro: number;

  @ApiProperty()
  @IsNumber()
  priceGems: number;

  @ApiProperty({default: null})
  @IsOptional()
  @IsString()
  codeId?: string;
}
