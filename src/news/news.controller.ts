import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.newsService.findAll(+page, +perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Get(':id/comments')
  findComments(@Param('id') id: string) {
    return this.newsService.findComments(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.newsService.like(id);
  }

  @Post(':id/dislike')
  dislike(@Param('id') id: string) {
    return this.newsService.dislike(id);
  }
}
