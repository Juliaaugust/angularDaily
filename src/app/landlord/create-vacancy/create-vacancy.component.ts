import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../common/services/users.service';
import { User } from '../../common/models/user.model';
import { Message } from '../../common/models/message.model';
import { Router } from '@angular/router';
import { HousingService } from '../../common/services/housing.service';
import { Housing } from '../../common/models/housing.model';
import { Vacancy } from '../../common/models/vacancy.model';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.sass']
})
export class CreateVacancyComponent implements OnInit {

  message: Message;

  // vacancy: Vacancy;

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

  constructor(
    private router: Router,
    private housingService: HousingService,
    private userService: UsersService
  ) { }

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
      }),
      description: new FormControl(''),
      maxGuests: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1),
        Validators.max(50)
      ]),
      pets: new FormControl(false),
      minDays: new FormControl(1, [Validators.min(1), Validators.pattern('^[0-9]+$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      // photos: new FormArray([])
    });
  }

  createVacancy() {
    const formData = {...this.createVacancyForm.value};
    const isVisible = false;

    const housing = new Housing(
      formData.name,
      formData.price,
      formData.address,
      formData.maxGuests,
      formData.type,
      formData.description
    );

    this.isClicked = true;
    if (this.createVacancyForm.invalid) {
      this.showMessage('Для создания вакансии заполните все необходимые поля!', 'error');
    } else {
      this.message.text = '';
      this.housingService.createNewHousing(housing)
        .subscribe((newHouse: Housing) => {

          const currentLandlord = JSON.parse(window.localStorage.getItem('user'));
          const vacancy = new Vacancy(newHouse.id, 'на рассмотрении');

          this.userService.addOwnVacancy(currentLandlord, vacancy)
            .subscribe(val => {
              console.log('landlord with vacancies', val);
            });

          // this.userService.addLandlordVacancy()

          this.showMessage('Вакансия была успешно создана!', 'info');
        });

      this.createVacancyForm.reset();
      this.isClicked = false;

      // добавить жилье в "мои вакансии" арендодателю и в "вакансии продавцов" админу

      // this.router.navigate(['landlord/vacancies']);
    }
  }

}
