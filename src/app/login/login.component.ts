import { Component, OnInit } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Form, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Observable<DocumentData[]> | undefined;
  currentUser: DocumentData | undefined;
  queryForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(private firestore: Firestore, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
  newQuery(){
    this.users = collectionData(collection(this.firestore, 'Users'));
    this.users.subscribe(
      data=>{
        this.currentUser = ((data.find((user) => user['email'] === this.queryForm.value.email)));
      }
    );
  }
}
