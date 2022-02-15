import { Injectable } from '@angular/core';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: BookService[] = [];
  constructor() { }
  getBooks(){
    return this.books;
  }
  setBooks(books: BookService[]){
    this.books = books;
  }
}
