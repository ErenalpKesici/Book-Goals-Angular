import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { BooksService } from '../books.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  books: BookService[]= [];
  constructor(private http: HttpClient, private formBuilder: FormBuilder, public booksService: BooksService) {}
  queryForm = this.formBuilder.group({
    name: '',
  });
  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }
  execQuery(query: String){
    this.http.get<any>('https://www.googleapis.com/books/v1/volumes?q='+query+':&key=AIzaSyDLoyAOZDuFluC26GIEFsEhj1ogF_EnsSQ').subscribe(
      data=>{
        for(let i=0;i<data.items.length;i++){
          this.books.push(new BookService(data.items[i].id, data.items[i].volumeInfo.title, data.items[i].volumeInfo.categories, data.items[i].volumeInfo.authors, data.items[i].volumeInfo.publishedDate, data.items[i].volumeInfo.pageCount,data.items[i].volumeInfo.imageLinks.thumbnail));
        }
      }
    );
    this.booksService.setBooks(this.books);
  }
  newQuery(){
    this.books = [];
    this.execQuery(this.queryForm.value.name);
  }
}
