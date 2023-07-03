import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UUID } from '../../../types/UUID';

export class PartnerCodeDto {
  @ApiProperty()
  @IsString()
  codeId: string;

  @ApiProperty()
  @IsString()
  uuid: UUID;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsString()
  discount_stripe_id: string;
}
