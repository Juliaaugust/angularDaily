import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../common/services/users.service';
import { User } from '../../common/models/user.model';
import { Message } from '../../common/models/message.model';
import { Router, ActivatedRoute } from '@angular/router';
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

  createVacancyForm: FormGroup;

  user: User;

  userCountry = '';
  userCity = '';

  isClicked = false;

  houseParamsFromEdit: Housing;

  isEdit = false;

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private housingService: HousingService,
    private userService: UsersService
  ) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(res => {
        if (!(Object.keys(res).length === 0)) {
          this.isEdit = true;
        }
        this.houseParamsFromEdit = {
          name: res.name,
          price: res.price,
          address: {
            country: res.country,
            city: res.city,
            street: res.street,
            house: res.house,
          },
          maxGuests: res.guests,
          description: res.description,
          type: res.type,
          id: res.id
        };
      });

    this.message = new Message('error', '');

    this.user = JSON.parse(window.localStorage.getItem('user'));

    if (this.user.country) {
      this.userCountry = this.user.country;
    }

    if (this.user.city) {
      this.userCity = this.user.city;
    }

    this.createVacancyForm = new FormGroup({
      name: new FormControl(this.houseParamsFromEdit.name, [Validators.required, Validators.minLength(3)]),
      type: new FormControl(this.houseParamsFromEdit.type, [Validators.required]),
      address: new FormGroup({
        country: new FormControl(
          this.houseParamsFromEdit.address.country || this.userCountry, Validators.required
        ),
        city: new FormControl(
          this.houseParamsFromEdit.address.city || this.userCity, Validators.required
        ),
        street: new FormControl(this.houseParamsFromEdit.address.street || '', Validators.required),
        house: new FormControl(this.houseParamsFromEdit.address.house || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
        // building: new FormControl('')
      }),
      description: new FormControl(this.houseParamsFromEdit.description || ''),
      maxGuests: new FormControl(this.houseParamsFromEdit.maxGuests || '', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1),
        Validators.max(50)
      ]),
      pets: new FormControl(false),
      minDays: new FormControl(1, [Validators.min(1), Validators.pattern('^[0-9]+$')]),
      price: new FormControl(this.houseParamsFromEdit.price || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
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

    housing.isVisible = isVisible;
    housing.rating = [];
    housing.reviews = [];
    housing.photos = [{
      id: 1,
      src: '../../../../assets/images/housing_variants/var_0_1.jpg'
    }];

    this.isClicked = true;
    if (this.createVacancyForm.invalid) {
      this.showMessage('Заполните все необходимые поля!', 'error');
    } else {
      this.message.text = '';

      if (this.isEdit === false) {
        this.housingService.createNewHousing(housing)
          .subscribe((newHouse: Housing) => {

            const currentLandlord = JSON.parse(window.localStorage.getItem('user'));
            const vacancy = new Vacancy(newHouse.id, 'на рассмотрении', currentLandlord.id);

            this.userService.addOwnVacancy(currentLandlord, vacancy)
              .subscribe(user => {
                window.localStorage.setItem('user', JSON.stringify(user));
              });

            this.userService.getUserById(1)
              .subscribe(adm => {
                this.userService.addLandlordVacancy(adm, vacancy)
                  .subscribe();
              });

            this.showMessage('Вакансия была успешно создана!', 'info');
          });

        this.createVacancyForm.reset();
        this.isClicked = false;
      } else {
        housing.id = this.houseParamsFromEdit.id;
        this.housingService.editHousing(housing)
          .subscribe();
        this.showMessage('Вакансия была успешно отредактирована!', 'info');
        // this.router.navigate(['landlord/vacancies']);
      }
    }
  }

}
