import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookService } from '../book.service';

import { HttpClient} from '@angular/common/http';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';   
import { LoginProvider } from 'angularx-social-login';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private login: LoginComponent) { }
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
