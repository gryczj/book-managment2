import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
