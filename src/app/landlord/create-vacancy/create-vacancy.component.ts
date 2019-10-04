import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../common/services/users.service';
import { User } from '../../common/models/user.model';
import { Message } from '../../common/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.sass']
})
export class CreateVacancyComponent implements OnInit {

  message: Message;
  createVacancyForm: FormGroup;
  user: User;
  userCountry = '';
  userCity = '';

  isClicked = false;

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  constructor(private router: Router) { }

  ngOnInit() {

    this.message = new Message('error', '');

    this.user = JSON.parse(window.localStorage.getItem('user'));

    if (this.user.country) {
      this.userCountry = this.user.country;
    }

    if (this.user.city) {
      this.userCity = this.user.city;
    }

    this.createVacancyForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      type: new FormControl(null, [Validators.required]),
      address: new FormGroup({
        country: new FormControl(this.userCountry, Validators.required),
        city: new FormControl(this.userCity, Validators.required),
        street: new FormControl('', Validators.required),
        houseNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        building: new FormControl('')
      })
    });
  }

  createVacancy() {
    console.log('form', this.createVacancyForm);
    const formData = {...this.createVacancyForm.value};
    console.log('form', formData);
    this.isClicked = true;
    if (this.createVacancyForm.invalid) {
      this.showMessage('Для создания вакансии заполните все необходимые поля!', 'error');
    } else {
      this.message.text = '';
      // добавить новый housing
      // добавить жилье в "мои вакансии" арендодателю и в "вакансии продавцов" админу
      this.router.navigate([]);
    }
  }

}
