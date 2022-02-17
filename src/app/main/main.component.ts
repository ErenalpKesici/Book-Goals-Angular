import { Component, Input, OnInit, Output } from '@angular/core';
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
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  {
  @Input() userGo: UsersService | undefined;
  @Input() libGo: LibraryService[] | undefined;
  @Input() goalGo: GoalService[] | undefined;
  public static user: SocialUser;
  emitUser(user: UsersService) {
    this.userGo =user;
  }
  emitLib(lib: LibraryService[]) {
    this.libGo = lib;
  }
  emitGoal(goal: GoalService[]) {
    this.goalGo = goal;
  }
  public thisUser: SocialUser = MainComponent.user;
  public myUser: UsersService | undefined;
  public libBook: string | undefined;
  public goals: GoalService[] = [];
  public libraries: LibraryService[] = []; 
  private usersCollection: AngularFirestoreCollection | undefined;
  users: Observable<DocumentData[]> | undefined;
  constructor(private authService: SocialAuthService, private firestore: Firestore, private router: Router, private auth: AngularFireAuth, private afs: AngularFirestore) {}
  
}
