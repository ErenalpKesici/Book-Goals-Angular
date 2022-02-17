import { Injectable } from '@angular/core';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(public book: BookService, public message: String) { }
  public toString(): string{
    return this.book.toString()+" " + this.message;
  }
}
