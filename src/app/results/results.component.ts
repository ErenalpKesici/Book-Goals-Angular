import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  public static books: BookService[]= [];
  public currentBooks: BookService[]= [];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) { }
  ngOnInit(): void {
    ResultsComponent.books = [];
    const routeParams = this.route.snapshot.paramMap;
    const queryFromRoute = String(routeParams.get('query'));
    this.execQuery(queryFromRoute);
  }
  execQuery(query: String){
    this.http.get<any>('https://www.googleapis.com/books/v1/volumes?q='+query+':&key=AIzaSyDLoyAOZDuFluC26GIEFsEhj1ogF_EnsSQ').subscribe(
      data=>{
        for(let i=0;i<data.items.length;i++){
          ResultsComponent.books.push(new BookService(data.items[i].id, data.items[i].volumeInfo.title, data.items[i].volumeInfo.categories, data.items[i].volumeInfo.authors, data.items[i].volumeInfo.publishedDate, data.items[i].volumeInfo.pageCount,data.items[i].volumeInfo.imageLinks?.thumbnail));
        }
        this.currentBooks = ResultsComponent.books;
      }
    );
  }
}
