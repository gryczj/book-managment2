import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from '../book-status.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  author: string;

  @Column()
  status: BookStatus;
}
