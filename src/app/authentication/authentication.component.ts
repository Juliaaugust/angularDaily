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
    }, 3000);
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
      email: new FormControl(null, [Validators.required, Validators.email]),
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
            // this.router.navigate(['']);
          } else {
            this.showMessage('Пароль неверный!');
          }
        } else {
          this.showMessage('Такого пользователя не существует!');
        }
      });
  }

  onSubmitReg() {
    const {email, password, name} = this.registrForm.value;
    const user = new User(email, password, name);

    console.log(this.registrForm);
    if (this.registrForm.value.agree === true) {
      if (this.registrForm.value.password === this.registrForm.value.password2) {
        this.message.text = '';
        this.userService.createNewUser(user)
        .subscribe((user: User) => {
          console.log(user);
          this.router.navigate(['/area', user.id]);
        });
      } else {
        this.message.text = 'Пароли не совпадают!';
        this.message.type = 'error';
      }
    } else {
      this.message.text = 'Необходимо согласиться с условиями регистрации';
      this.message.type = 'error';
    }

  }

}
