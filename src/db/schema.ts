import { text } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  }).$onUpdate(() => new Date().toISOString()),
  title: text('title').notNull(),
  body: text('body').notNull(),
  imageUrl: text('image_url').notNull(),
  likes: integer('likes').notNull().default(0),
  dislikes: integer('dislikes').notNull().default(0),
  tags: text('tags').notNull().default(''),
  views: integer('views').notNull().default(0),
});

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  author: text('author').notNull(),
  text: text('text').notNull(),
  likes: integer('likes').notNull().default(0),
  dislikes: integer('dislikes').notNull().default(0),
  newsId: uuid('news_id')
    .notNull()
    .references(() => news.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
