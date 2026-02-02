import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    type: 'string',
    example: 'This is a comment text.',
  })
  text: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'test-id-1',
  })
  newsId: string;
}
