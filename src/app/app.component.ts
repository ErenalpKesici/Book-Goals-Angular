import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { GoalService } from './goal.service';
import { LibraryService } from './library.service';
import { LoginComponent } from './login/login.component';
import { SaveService } from './save.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() userGo = new EventEmitter<UsersService>();
  @Output() libGo = new EventEmitter<LibraryService[]>();
  @Output() goalGo = new EventEmitter<GoalService[]>();
  public static user: SocialUser;
  public libBook: string | undefined;
  public goals: GoalService[] = [];
  public libraries: LibraryService[] = []; 
  users: Observable<DocumentData[]> | undefined;
  private usersCollection: AngularFirestoreCollection | undefined;
  public myUser: UsersService | undefined;
  public myLibs: LibraryService [] | undefined;
  public myGoals: GoalService []| undefined;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: SocialAuthService, private auth: AngularFireAuth, private afs: AngularFirestore, private firestore: Firestore,) {
      this.findUser();
  }
  public findUser(): void{
    SaveService.goals = [];
    SaveService.libs = [];
    this.authService.authState.subscribe(user => {
      if(user != undefined){
        document.getElementById('login')!.style.display = 'none';
        this.users = collectionData(collection(this.firestore, 'Users'));
        this.users.subscribe(
          data=>{
            const tmp: DocumentData = data[data.findIndex((userEach) => userEach['email'] === user['email'])];
            if(tmp == undefined){
              this.auth.createUserWithEmailAndPassword(user['email'], user['id']);
              this.usersCollection = this.afs.collection<UsersService>('Users');
              this.usersCollection.doc(AppComponent.user.email).set({email: AppComponent.user.email, name: AppComponent.user.name,password: AppComponent.user.id, dateUpdated: '', save: ''});
            }
            else{
              this.myUser = new UsersService(tmp['email'], tmp['name'], tmp['password'], tmp['dateUpdated'], tmp['save']);
              var jsonParsedArray = JSON.parse(this.myUser.save.toString());
              for (let key in jsonParsedArray) {
                if(key == 'goals'){
                  for(let i in jsonParsedArray[key])
                    SaveService.goals.push(jsonParsedArray[key][i]);
                }
                if(key == 'libs'){
                  for(let i in jsonParsedArray[key])
                    SaveService.libs.push(jsonParsedArray[key][i]);
                }
              }
              this.goals = SaveService.goals;
              if(document.getElementById('progress') != undefined)
                document.getElementById('progress')!.style.width=500 * (this.goals[0].books.length/this.goals[0].goalBooks)+'px';
              this.libraries = SaveService.libs;
              this.myLibs = this.libraries;
              this.myGoals = this.goals;
              // this.emitUser(this.myUser);
              // this.emitLib(this.libraries);
              // this.emitGoal(this.goals);
            }
          }
        );
      }
      else{
        if(document.getElementById('logout') != undefined)
          document.getElementById('logout')!.style.display = 'none';
        this.router.navigate(['/login']);
      }
    });
  }
}
