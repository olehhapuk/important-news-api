import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create comment',
  })
  @ApiResponse({
    status: 201,
    type: CommentDto,
  })
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete comment',
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
    return this.commentsService.remove(id);
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Like comment',
  })
  @ApiResponse({
    status: 200,
    type: CommentDto,
  })
  like(@Param('id') id: string) {
    return this.commentsService.like(id);
  }

  @Post(':id/dislike')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Dislike comment',
  })
  @ApiResponse({
    status: 200,
    type: CommentDto,
  })
  dislike(@Param('id') id: string) {
    return this.commentsService.dislike(id);
  }
}
