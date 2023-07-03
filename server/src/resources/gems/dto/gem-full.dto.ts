import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GemFullDto {
  @ApiProperty()
  @IsString()
  gemOfferId: string;

  @ApiProperty()
  @IsNumber()
  gems: number;

  @ApiProperty()
  @IsNumber()
  bonus: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty()
  @IsString()
  stripeId: string;

  @ApiProperty()
  @IsString()
  status: string;
}
