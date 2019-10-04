import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../common/models/user.model';
import { Message } from '../common/models/message.model';
import { UsersService } from '../common/services/users.service';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  authorizForm: FormGroup;
  registrForm: FormGroup;

  message: Message;

  enterTab = true;

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  changeTab() {
    this.enterTab = !this.enterTab;
  }

  ngOnInit() {
    this.message = new Message('error', '');
    this.authorizForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
    this.registrForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      agree: new FormControl(false, [])
      // agree: new FormControl(false, [this.registrForm.value.password])
    });
  }

  onSubmitAuth() {
    // console.log(this.authorizForm);
    const formData = this.authorizForm.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();

            switch (user.role) {
              case 'клиент': {
                this.router.navigate(['/client/area', user.id]);
                break;
              }
              case 'администратор': {
                this.router.navigate(['/admin/area', user.id]);
                break;
              }
              case 'арендодатель': {
                this.router.navigate(['/landlord/area', user.id]);
                break;
              }
            }

          } else {
            this.showMessage('Пароль неверный!', 'error');
          }
        } else {
          this.showMessage('Такого пользователя не существует!', 'error');
        }
      });
  }

  onSubmitReg() {
    const {email, password, name} = this.registrForm.value;
    const registrDate = new Date().toDateString();
    const role = 'клиент';
    const user = new User(email, password, name, role, registrDate);
    user.reservations = [];

    if (this.registrForm.value.agree === true) {
      if (this.registrForm.value.password === this.registrForm.value.password2) {
        this.message.text = '';
        this.userService.createNewUser(user)
        .subscribe(() => {
          this.userService.getUserByEmail(user.email)
            .subscribe(usr => {
              user.id = usr.id;
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              this.router.navigate(['/client/area', usr.id]);
            });
        });
      } else {
        this.showMessage('Пароли не совпадают!', 'error');
      }
    } else {
      this.showMessage('Необходимо согласиться с условиями регистрации', 'error');
    }
  }

  forbiddenEmails(control: FormControl) {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            return resolve({forbiddenEmail: true});
          } else {
            return resolve(null);
          }
        });
    });
  }
}
