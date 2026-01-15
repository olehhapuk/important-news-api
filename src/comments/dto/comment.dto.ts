import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'test-id-1',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    type: 'string',
    example: 'Test comment 1',
  })
  text: string;

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
    format: 'uuid',
    example: 'test-id-1',
  })
  newsId: string;
}
