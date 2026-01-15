import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Test title 1',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '### Header 3',
  })
  body: string;

  @ApiProperty({
    type: 'string',
    format: 'url',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;
}
