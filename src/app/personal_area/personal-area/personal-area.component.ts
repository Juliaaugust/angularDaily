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

  saveChanges() {
    const country = this.user.country;
    const city = this.user.city;
    const username = `${this.surname} ${this.name} ${this.patronymic}`;

    this.userService.changeUserParams(this.user, username, country, city)
      .subscribe(data => {
        console.log(data);
      });

  }

}
