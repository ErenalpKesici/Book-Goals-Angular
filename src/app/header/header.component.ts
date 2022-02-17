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
  @Input() user: UsersService | undefined;
  @Input() libs: LibraryService []| undefined;
  @Input() goals: GoalService []| undefined;
  emitUser(user: UsersService) {
    this.user =user;
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private login: LoginComponent, private authService: SocialAuthService, private auth: AngularFireAuth) { }
  queryForm = this.formBuilder.group({
    name: '',
  });
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  doSearch(): void{
    this.router.navigate(['/results', this.queryForm.value.name]);
  }
  logOut(): void{
    this.login.signOut();
  }
}
