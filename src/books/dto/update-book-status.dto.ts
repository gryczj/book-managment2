import { IsEnum } from 'class-validator';
import { BookStatus } from '../book-status.enum';

export class UpdateBookStatusDto {
  @IsEnum(BookStatus)
  status: BookStatus;
}
