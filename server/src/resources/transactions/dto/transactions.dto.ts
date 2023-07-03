import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { UUID } from '../../../types/UUID';

export class TransactionsDto {
  @ApiProperty()
  @IsString()
  transactionsId: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  uuid: UUID;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsDate()
  date: Date = new Date();

  @ApiProperty()
  @IsString()
  commandId: string;
}

export class CreateTransactionsDto {
  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsString()
  commandId: string;
}
