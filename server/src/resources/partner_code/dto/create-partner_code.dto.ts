import { PartnerCodeDto } from './partner_code.dto';
import { OmitType } from '@nestjs/swagger';

export class CreatePartnerCodeDto extends OmitType(PartnerCodeDto, [
  'status',
  'discount_stripe_id',
]) {}
