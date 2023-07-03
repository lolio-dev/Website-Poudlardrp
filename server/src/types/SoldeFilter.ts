import { IsDateString } from "class-validator";

export class SoldeFilter {
    @IsDateString()
    startAt: string;

    @IsDateString()
    endAt: string;
  }