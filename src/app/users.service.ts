import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private email: String, private name: String, private password: String, private dateUpdated: String, private save: String, ) { };
  public toString(): String{
    return this.email+" " + this.password+" "+this.save;
  }
}
