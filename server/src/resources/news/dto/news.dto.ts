import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NewsDto {
  @ApiProperty()
  @IsString()
  newsId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNumber()
  date: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  status: string;
}
