import { ApiProperty } from '@nestjs/swagger';

export class NewsPostDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'test-id-1',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'datetime',
    example: '2025-01-01',
  })
  createdAt: string;

  @ApiProperty({
    type: 'string',
    format: 'datetime',
    example: '2025-01-01',
  })
  updatedAt: string;

  @ApiProperty({
    type: 'string',
    example: 'Test title 1',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    example: '### Header 3',
  })
  body: string;

  @ApiProperty({
    type: 'string',
    format: 'url',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  likes: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  dislikes: number;

  @ApiProperty({
    type: 'string',
    example: 'tag1,tag2,tag3',
  })
  tags: string;
}
