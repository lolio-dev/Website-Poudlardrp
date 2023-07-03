import { OmitType } from '@nestjs/swagger';
import { NewsDto } from './news.dto';

export class CreateNewsDto extends OmitType(NewsDto, ['newsId'] as const) {}
