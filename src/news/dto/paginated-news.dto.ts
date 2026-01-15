import { ApiProperty } from '@nestjs/swagger';
import { NewsPostDto } from './news-post.dto';

export class PaginatedNewsDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: 'number',
    example: 12,
  })
  perPage: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  pagesCount: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  totalCount: number;

  @ApiProperty({
    type: [NewsPostDto],
  })
  data: NewsPostDto[];
}
