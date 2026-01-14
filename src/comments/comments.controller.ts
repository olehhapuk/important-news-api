import { Controller, Delete, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.commentsService.like(id);
  }

  @Post(':id/dislike')
  dislike(@Param('id') id: string) {
    return this.commentsService.dislike(id);
  }
}
