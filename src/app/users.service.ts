import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public email: String, public name: String, private password: String, public dateUpdated: String, public save: String, ) { };
  public tostring(): string{
    return this.email+" " + this.password+" "+this.save;
  }
}
