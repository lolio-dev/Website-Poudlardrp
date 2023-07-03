import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { DeleteResult } from "typeorm";

export class DeleteCartResultDto {
  @ApiProperty()
  @IsNumber()
  newPrice: number;

  @ApiProperty()
  deleteResult: DeleteResult;
}
