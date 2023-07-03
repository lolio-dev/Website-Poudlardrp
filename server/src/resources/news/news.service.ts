import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NewsSchema } from './entity/news.schema';
import { newsToFullDto } from './news.adaptater';
import { NewsDto } from './dto/news.dto';
import { Status } from '../../types/enums/status.enum';
import { ProductStatus } from '../../types/enums/productStatus.enum';
import { v4 as uuidv4 } from 'uuid';
import { NewsStatus } from '../../types/enums/NewsStatus.enum';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsSchema)
    private newsRepository: Repository<NewsSchema>
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsDto> {
    const newNews: NewsSchema = { ...createNewsDto, newsId: uuidv4() };
    const savedNews = await this.newsRepository.save(newNews);
    return newsToFullDto(savedNews);
  }

  async findAll(): Promise<NewsDto[]> {
    const news: NewsSchema[] = await this.newsRepository.find({
      where: [{ status: NewsStatus.ENABLE }, { status: NewsStatus.DISABLE }],
    });

    return news ? news.map(n => newsToFullDto(n)) : undefined;
  }

  async findOne(id: string): Promise<NewsDto> {
    const news: NewsSchema = await this.newsRepository.findOne({
      where: { newsId: id },
    });

    return news ? newsToFullDto(news) : undefined;
  }

  async update(id: string, updateNewsDto: Partial<NewsDto>): Promise<UpdateResult> {
    return this.newsRepository.update(id, { ...updateNewsDto });
  }

  async archive(id: string): Promise<UpdateResult> {
    const news = await this.newsRepository.findOneBy({ newsId: id });
    if (!news)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'News not found' },
        HttpStatus.NOT_FOUND
      );

    return this.newsRepository.update(id, { status: Status.ARCHIVED });
  }

  async unarchive(id: string): Promise<UpdateResult> {
    const news = await this.newsRepository.findOneBy({ newsId: id });
    if (!news)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'News not found' },
        HttpStatus.NOT_FOUND
      );

    return this.newsRepository.update(id, { status: ProductStatus.ENABLE });
  }
}
