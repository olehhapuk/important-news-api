import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { db } from 'src/db';
import { comments, news } from 'src/db/schema';
import { desc, eq, sql } from 'drizzle-orm';

@Injectable()
export class NewsService {
  async create(dto: CreateNewsDto) {
    const [newItem] = await db
      .insert(news)
      .values({
        title: dto.title.trim(),
        body: dto.body.trim(),
        imageUrl: dto.imageUrl.trim(),
        tags: dto.tags.trim(),
      })
      .returning();

    return newItem;
  }

  async findAll(page: number, perPage: number) {
    const newsItems = await db.query.news.findMany({
      orderBy: () => desc(news.createdAt),
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalCount = await db.$count(news);

    return {
      page,
      perPage,
      pagesCount: Math.ceil(totalCount / perPage),
      totalCount,
      data: newsItems,
    };
  }

  async findOne(id: string) {
    const item = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async findComments(id: string) {
    const item = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!item) {
      throw new NotFoundException();
    }

    const commentsData = await db.query.comments.findMany({
      where: () => eq(comments.newsId, id),
    });

    return commentsData;
  }

  async update(id: string, dto: UpdateNewsDto) {
    const item = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!item) {
      throw new NotFoundException();
    }

    const [updatedItem] = await db
      .update(news)
      .set({
        title: dto.title?.trim(),
        body: dto.body?.trim(),
        imageUrl: dto.imageUrl?.trim(),
        tags: dto.tags?.trim(),
      })
      .where(eq(news.id, id))
      .returning();

    return updatedItem;
  }

  async remove(id: string) {
    const item = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!item) {
      throw new NotFoundException();
    }

    await db.delete(news).where(eq(news.id, id));

    return {
      deleted: true,
    };
  }

  async like(id: string) {
    const newsItem = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!newsItem) {
      throw new NotFoundException();
    }

    const [updatedNewsItem] = await db
      .update(news)
      .set({
        likes: sql`${news.likes} + 1`,
      })
      .where(eq(news.id, id))
      .returning();

    return updatedNewsItem;
  }

  async dislike(id: string) {
    const newsItem = await db.query.news.findFirst({
      where: () => eq(news.id, id),
    });
    if (!newsItem) {
      throw new NotFoundException();
    }

    const [updatedNewsItem] = await db
      .update(news)
      .set({
        likes: sql`${news.dislikes} + 1`,
      })
      .where(eq(news.id, id))
      .returning();

    return updatedNewsItem;
  }
}
