import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role } from '../../types/enums/role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a news' })
  @ApiResponse({
    status: 201,
    description: 'The news has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'The news is already created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'Get one news' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Invalid news ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No news found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Get(':newsId')
  findOne(@Param('newsId') id: string) {
    return this.newsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a news' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The news has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid news ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No news found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Patch(':newsId')
  update(@Param('newsId') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @ApiOperation({ summary: 'Archive a news' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No offer found.' })
  @Post(':id/archive')
  archive(@Param('id') id: string) {
    return this.newsService.archive(id);
  }

  @ApiOperation({ summary: 'Unarchive a news' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No offer found.' })
  @Post(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.newsService.unarchive(id);
  }
}
