import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { BooksService } from '../books.service';
import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  books: BookService[]= [];
  book: BookService | undefined;
  constructor(private route: ActivatedRoute, public booksService: BooksService, private firestore: Firestore) { }
  ngOnInit(): void {
    this.books = this.booksService.getBooks();
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = String(routeParams.get('bookId'));
    this.book = this.books.find((book) => book.id === bookIdFromRoute);
  }

}
