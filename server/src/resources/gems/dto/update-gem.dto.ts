import { PartialType } from '@nestjs/swagger';
import { CreateGemDto } from './create-gem.dto';

export class UpdateGemDto extends PartialType(CreateGemDto) {}
