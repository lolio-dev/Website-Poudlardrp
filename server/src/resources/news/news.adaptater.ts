import { NewsSchema } from './entity/news.schema';
import { NewsDto } from './dto/news.dto';

export function newsToFullDto(news: NewsSchema): NewsDto {
  return { ...news };
}
