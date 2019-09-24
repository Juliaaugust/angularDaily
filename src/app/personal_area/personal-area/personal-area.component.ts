import { Component, OnInit } from '@angular/core';

import { User } from '../../common/models/user.model';
import { UsersService } from 'src/app/common/services/users.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.sass']
})
export class PersonalAreaComponent implements OnInit {

  user: User;
  date = new Date().toDateString();

  name = '';
  surname = '';
  patronymic = '';

  constructor(private userService: UsersService) { }

  ngOnInit() {
    console.log(this.date);
    this.user = JSON.parse(window.localStorage.getItem('user'));
    const usernameArr = this.user.name.split(' ');
    if (usernameArr.length === 1) {
      this.name = usernameArr[0];
    } else if (usernameArr.length >= 2) {
      this.surname = usernameArr[0];
      this.name = usernameArr[1];
      if (usernameArr.length > 2) {
        this.patronymic = usernameArr[2];
      }
    }
  }

  savePersonalChanges() {
    const country = this.user.country;
    const city = this.user.city;
    const username = `${this.surname} ${this.name} ${this.patronymic}`;

    this.userService.changePersonalUserParams(this.user, username, country, city)
      .subscribe(data => {
        // console.log(data);
      });
  }

  saveContactsChanges() {
    const email = this.user.email;
    const tel = this.user.tel;

    this.userService.changeContactsUserParams(this.user, tel, email)
      .subscribe(data => {
        // console.log(data);
      });
  }

  savePasswordChanges() {
    const password = this.user.password;

    this.userService.changeUserPassword(this.user, password)
      .subscribe(data => {
        // console.log(data);
      });
  }

}
