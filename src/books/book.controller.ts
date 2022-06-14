import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './dto/book.entity';
import { BookService } from './book.service';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get('/:id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Get('/:type')
  async getBooksByType(@Param('type') type: string): Promise<Book[]> {
    return this.bookService.getBooksByType(type);
  }

  @Get('/freeBooks')
  async getFreeBooks(): Promise<Book[]> {
    return this.bookService.getAllFreeBooks();
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string): Promise<{ id: string }> {
    return this.bookService.deleteBook(id);
  }

  @Patch('/:id/status')
  async updateBookStatus(
    @Param('id') id: string,
    @Body() updateBookStatusDto: UpdateBookStatusDto,
  ): Promise<Book> {
    const { status } = updateBookStatusDto;
    return this.bookService.updateBookStatus(id, status);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Book {
    return this.bookService.createBook(createBookDto);
  }
}
