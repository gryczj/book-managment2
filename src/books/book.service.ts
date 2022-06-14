import { Injectable, NotFoundException } from '@nestjs/common';
import { BookStatus } from './book-status.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './dto/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepostiory: BookRepository,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepostiory.getBooks();
  }

  async getBooksByType(type: string): Promise<Book[]> {
    return this.bookRepostiory.findBy({ type });
  }

  async getAllFreeBooks(): Promise<Book[]> {
    return this.bookRepostiory.findBy({ status: BookStatus.FREE });
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepostiory.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Book with id: ${id} not found.`);
    }
    return found;
  }

  async deleteBook(id: string): Promise<{ id: string }> {
    const result = await this.bookRepostiory.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }
    return { id };
  }

  async updateBookStatus(id: string, status: BookStatus): Promise<Book> {
    const found = await this.getBookById(id);
    found.status = status;
    await this.bookRepostiory.save(found);
    return found;
  }

  createBook(createBookDto: CreateBookDto): Book {
    const { title, description } = createBookDto;
    const book = this.bookRepostiory.create({
      title,
      description,
      status: BookStatus.FREE,
    });
    this.bookRepostiory.save(book);
    return book;
  }
}
