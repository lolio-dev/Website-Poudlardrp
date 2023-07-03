import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { FullCartDto } from "./full-cart.dto";

export class CartsDto {
  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  carts: FullCartDto[];
}
