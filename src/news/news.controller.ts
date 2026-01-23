import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsPostDto } from './dto/news-post.dto';
import { PaginatedNewsDto } from './dto/paginated-news.dto';
import { CommentDto } from 'src/comments/dto/comment.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create news post',
  })
  @ApiResponse({
    status: 201,
    type: NewsPostDto,
  })
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Search news posts',
  })
  @ApiResponse({
    status: 200,
    type: PaginatedNewsDto,
  })
  findAll(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.newsService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one news post by id',
  })
  @ApiResponse({
    status: 200,
    type: NewsPostDto,
  })
  findOne(@Param('id') id: string) {
    return this.newsService.viewOne(id);
  }

  @Get(':id/comments')
  @ApiOperation({
    summary: 'Find comments for news post',
  })
  @ApiResponse({
    status: 200,
    type: [CommentDto],
  })
  findComments(@Param('id') id: string) {
    return this.newsService.findComments(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update news post',
  })
  @ApiResponse({
    status: 200,
    type: NewsPostDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete news post',
  })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        deleted: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Like news post',
  })
  @ApiResponse({
    status: 200,
    type: NewsPostDto,
  })
  like(@Param('id') id: string) {
    return this.newsService.like(id);
  }

  @Post(':id/dislike')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Dislike news post',
  })
  @ApiResponse({
    status: 200,
    type: NewsPostDto,
  })
  dislike(@Param('id') id: string) {
    return this.newsService.dislike(id);
  }
}
