import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsSchema } from './entity/news.schema';

@Module({
  imports: [TypeOrmModule.forFeature([NewsSchema])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService, TypeOrmModule],
})
export class NewsModule {}
