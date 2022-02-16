import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { BooksService } from '../books.service';
import { BookService } from '../book.service';
import { LoginComponent } from '../login/login.component';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  books: BookService[]= [];
  public static user: SocialUser;
  public thisUser: SocialUser = MainComponent.user;
  myUser: UsersService | undefined;
  users: Observable<DocumentData[]> | undefined;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, public booksService: BooksService, private authService: SocialAuthService, private firestore: Firestore) {}
  queryForm = this.formBuilder.group({
    name: '',
  });
  ngOnInit(): void {
    this.books = this.booksService.getBooks();
    if(MainComponent.user == undefined){
      this.authService.authState.subscribe(user => {
        MainComponent.user = user;
        this.thisUser = MainComponent.user;
        alert(MainComponent.user);
        alert(this.thisUser);
        if(MainComponent.user != undefined){
          this.users = collectionData(collection(this.firestore, 'Users'));
          this.users.subscribe(
            data=>{
              const tmp: DocumentData = data[data.findIndex((user) => user['email'] === MainComponent.user?.email)];
              this.myUser = new UsersService(tmp['email'], tmp['name'], tmp['password'], tmp['dateUpdated'], tmp['save']);
            }
          );
        }
      });
    }
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
