import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { db } from 'src/db';
import { comments } from 'src/db/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class CommentsService {
  async create(dto: CreateCommentDto) {
    const [newComment] = await db
      .insert(comments)
      .values({
        author: dto.author.trim(),
        text: dto.text.trim(),
        newsId: dto.newsId,
      })
      .returning();

    return newComment;
  }

  async remove(id: string) {
    const comment = await db.query.comments.findFirst({
      where: () => eq(comments.id, id),
    });
    if (!comment) {
      throw new NotFoundException();
    }

    await db.delete(comments).where(eq(comments.id, id));

    return {
      deleted: true,
    };
  }

  async like(id: string) {
    const comment = await db.query.comments.findFirst({
      where: () => eq(comments.id, id),
    });
    if (!comment) {
      throw new NotFoundException();
    }

    const [updatedComment] = await db
      .update(comments)
      .set({
        likes: sql`${comments.likes} + 1`,
      })
      .where(eq(comments.id, id))
      .returning();

    return updatedComment;
  }

  async dislike(id: string) {
    const comment = await db.query.comments.findFirst({
      where: () => eq(comments.id, id),
    });
    if (!comment) {
      throw new NotFoundException();
    }

    const [updatedComment] = await db
      .update(comments)
      .set({
        likes: sql`${comments.dislikes} + 1`,
      })
      .where(eq(comments.id, id))
      .returning();

    return updatedComment;
  }
}
