import { Component, OnInit } from '@angular/core';

import { User } from '../../common/models/user.model';
import { UsersService } from 'src/app/common/services/users.service';
import { Message } from '../../common/models/message.model';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.sass']
})
export class PersonalAreaComponent implements OnInit {

  user: User;
  message: Message;
  forArea: string;

  name = '';
  surname = '';
  patronymic = '';

  date = new Date();

  private showMessage(text: string, type: string = 'info', forArea: string) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
    this.forArea = forArea;
  }

  constructor(private userService: UsersService) { }

  ngOnInit() {

    this.message = new Message('info', '');

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
    this.message.text = '';

    const country = this.user.country;
    const city = this.user.city;
    const username = `${this.surname} ${this.name} ${this.patronymic}`;

    this.userService.changePersonalUserParams(this.user, username, country, city)
      .subscribe(user => {
        console.log(user);
        this.user = JSON.parse(window.localStorage.getItem('user'));
      });

    this.showMessage('Новые изменения вступили в силу', 'info', 'personalChanges');
  }

  saveContactsChanges() {
    this.message.text = '';

    const email = this.user.email;
    const tel = this.user.tel;

    this.userService.changeContactsUserParams(this.user, tel, email)
      .subscribe(user => {
        console.log(user);
        this.user = JSON.parse(window.localStorage.getItem('user'));
      });

    this.showMessage('Новые изменения вступили в силу', 'info', 'contactsChanges');
  }

  savePasswordChanges() {
    this.message.text = '';

    const password = this.user.password;

    this.userService.changeUserPassword(this.user, password)
      .subscribe(user => {
        console.log(user);
        this.user = JSON.parse(window.localStorage.getItem('user'));
      });

    this.showMessage('Новые изменения вступили в силу', 'info', 'passwordChanges');
  }

}
