import { Component, OnInit } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Observable<DocumentData[]> | undefined;
  constructor(private firestore: Firestore) { }
  ngOnInit(): void {
    this.user = collectionData(collection(this.firestore, 'Users'));
    this.user.subscribe(
      data=>{
        alert(data[0]['email']);
      }
    );
  }

}
