import { ApiProperty } from "@nestjs/swagger";
import { UpdateResult } from "typeorm";
import { CartSchema } from "../entity/cart.schema";
import { IsBoolean, IsNumber } from "class-validator";

export class CreateCartResultDto {
  @ApiProperty()
  result: UpdateResult | CartSchema;

  @ApiProperty()
  @IsNumber()
  quantityOwned?: number;

  @ApiProperty()
  @IsNumber()
  quantityAvailable?: number;

  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;
}
