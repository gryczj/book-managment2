import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './dto/book.entity';
import { BookStatus } from './book-status.enum';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(): Promise<Book[]> {
    const query = this.createQueryBuilder('book');

    const books = await query.getMany();
    return books;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, description } = createBookDto;

    const book = this.create({
      title,
      description,
      status: BookStatus.FREE,
    });

    await this.save(book);
    return book;
  }
}
