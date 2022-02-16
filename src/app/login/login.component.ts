import { Component, OnInit } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Form, FormBuilder} from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router, RouterLink } from '@angular/router';
import { MainComponent } from '../main/main.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Observable<DocumentData[]> | undefined;
  public user: SocialUser = new SocialUser;
  // currentUser: DocumentData | undefined;
  private currentUser: SocialUser | undefined;
  queryForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(private firestore: Firestore, private formBuilder: FormBuilder, private authService: SocialAuthService, private router: Router) { }
  ngOnInit(): void {
    if(MainComponent.user == undefined){
      document.getElementById('btnSignOut')!.style.display = 'none';
    }else{
      document.getElementById('btnGoogle')!.style.display = 'none';
    }
  }
  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((value)=>{
      this.currentUser = value;
      this.router.navigate(['/']);
    });
  }
  public signOut(): void {
    this.authService.signOut();
    MainComponent.user = new SocialUser();
    this.router.navigate(['/']);
  }
  // queryUser(){
  //   this.users = collectionData(collection(this.firestore, 'Users'));
  //   this.users.subscribe(
  //     data=>{
  //       this.currentUser = ((data.find((user) => user['email'] === this.queryForm.value.email)));
  //     }
  //   );
  // }
}
