import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { LibraryService } from '../library.service';
import { SaveService } from '../save.service';
import { GoalService } from '../goal.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MainComponent } from '../main/main.component';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  @Output() userGo = new EventEmitter<UsersService>();
  @Output() libGo = new EventEmitter<LibraryService[]>();
  @Output() goalGo = new EventEmitter<GoalService[]>();
  emitUser(user: UsersService) {
    this.userGo.emit(user);
  }
  emitLib(lib: LibraryService[]) {
    this.libGo.emit(lib);
  }
  emitGoal(goal: GoalService[]) {
    this.goalGo.emit(goal);
  }
  public static user: SocialUser;
  public thisUser: SocialUser = MainComponent.user;
  public myUser: UsersService | undefined;
  public libBook: string | undefined;
  public goals: GoalService[] = [];
  public libraries: LibraryService[] = []; 
  users: Observable<DocumentData[]> | undefined;
  private usersCollection: AngularFirestoreCollection | undefined;
  constructor(private formBuilder: FormBuilder, private router: Router, private login: LoginComponent, private authService: SocialAuthService, private firestore: Firestore, private auth: AngularFireAuth, private afs: AngularFirestore, private main: MainComponent) { }
  queryForm = this.formBuilder.group({
    name: '',
  });
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.findUser();
  }
  public findUser(): void{
    SaveService.goals = [];
    SaveService.libs = [];
    this.authService.authState.subscribe(user => {
      MainComponent.user = user;
      this.thisUser = MainComponent.user;
      if(MainComponent.user != undefined){
        document.getElementById('login')!.style.display = 'none';
        this.users = collectionData(collection(this.firestore, 'Users'));
        this.users.subscribe(
          data=>{
            const tmp: DocumentData = data[data.findIndex((user) => user['email'] === MainComponent.user?.email)];
            if(tmp == undefined){
              this.auth.createUserWithEmailAndPassword(user['email'], user['id']);
              this.usersCollection = this.afs.collection<UsersService>('Users');
              this.usersCollection.doc(MainComponent.user.email).set({email: MainComponent.user.email, name: MainComponent.user.name,password: MainComponent.user.id, dateUpdated: '', save: ''});
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
              this.emitUser(this.myUser);
              this.emitLib(this.libraries);
              this.emitGoal(this.goals);
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
  doSearch(): void{
    this.router.navigate(['/results', this.queryForm.value.name]);
  }
  logOut(): void{
    this.login.signOut();
  }
}
