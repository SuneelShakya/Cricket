import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Authorization {
  constructor(public http: HttpClient) {}

  currentState() {}
  // tslint:disable-next-line:member-ordering
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}


  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
}
