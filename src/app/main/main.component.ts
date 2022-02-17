import { Component, OnInit, Output } from '@angular/core';
import { BooksService } from '../books.service';
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
  public static user: SocialUser;
  public thisUser: SocialUser = MainComponent.user;
  public myUser: UsersService | undefined;
  public libBook: string | undefined;
  users: Observable<DocumentData[]> | undefined;
  constructor(public booksService: BooksService, private authService: SocialAuthService, private firestore: Firestore) {}
  ngOnInit(): void {
    if(MainComponent.user == undefined){
      this.authService.authState.subscribe(user => {
        MainComponent.user = user;
        this.thisUser = MainComponent.user;
        if(MainComponent.user != undefined){
          document.getElementById('login')!.style.display = 'none';
          this.users = collectionData(collection(this.firestore, 'Users'));
          this.users.subscribe(
            data=>{
              const tmp: DocumentData = data[data.findIndex((user) => user['email'] === MainComponent.user?.email)];
              this.myUser = new UsersService(tmp['email'], tmp['name'], tmp['password'], tmp['dateUpdated'], tmp['save']);
              JSON.parse(this.myUser.save.toString(), (key, value) =>{
                if(key == 'libs'){
                  console.log(value);
                }
                switch(key){
                    // this.libBook = value[0].book;

                }
              }
              );
            }
          );
        }
        else{
          document.getElementById('logout')!.style.display = 'none';
        }
      });
    }
  }
}
