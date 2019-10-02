import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class UsersService {

  public token: string;
  private logger = new Subject<boolean>();
  private loggedIn: boolean;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.loggedIn = this.token ? true : false;
  }

  getUserByEmail(email: string) {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
    .pipe(map((user) => user[0] ? user[0] : undefined));
  }

  // getUserById(id: number) {
  //   return this.http.get(`http://localhost:3000/users/${id}`)
  //   .pipe(map((user) => user[0] ? user[0] : undefined));
  // }

  createNewUser(user: User) {
    return this.http.post('http://localhost:3000/users', user);
  }

  changePersonalUserParams(user: User, username: string, country: string, city: string) {
    user.name = username;
    user.country = country;
    user.city = city;

    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }

  changeContactsUserParams(user: User, tel: string, email: string) {
    user.email = email;
    user.tel = tel;

    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }

  changeUserPassword(user: User, password: string) {
    user.password = password;

    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }
}
