import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { Router } from '@angular/router';
import { UsersService } from '../../../common/services/users.service';
import { User } from '../../../common/models/user.model';

@Component({
  selector: 'app-vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['../vacancies.component.sass', './vacancy-card.component.sass']
})
export class VacancyCardComponent implements OnInit {

  @Input() vacancy: Vacancy;

  showConfirm = false;

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  status = '';

  user: User;

  // query params for edit
  name = ''; type = '';
  country = ''; city = ''; street = ''; house: number;
  description = ''; guests = ''; price: number;

  constructor(
    private housing: HousingService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.status = this.vacancy.status;

    this.housing.getHousingById(this.vacancy.housingId)
      .subscribe((val: Housing) => {
        this.housingName = this.name = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, д.${val.address.house}`;
        this.housingPrice = this.price = val.price;

        this.country = val.address.country;
        this.city = val.address.city;
        this.street = val.address.street;
        this.house = val.address.house;

        this.description = val.description;
        this.guests = val.maxGuests;
        this.price = val.price;
        this.type = val.type;
      });
  }

  editVacancy() {
    const {name, type, city, street, house, description, guests, price} = this;
    const id = this.vacancy.housingId;
    this.router.navigate(['/landlord/edit'],
      {queryParams: {name, type, city, street, house, description, guests, price, id}});
  }

  deleteVacancyBtn() {
    this.showConfirm = true;
    console.log(this.vacancy);
  }

  deleteVacancyFromConfirm() {
    console.log('Вакансия удалена!');

    this.user = JSON.parse(window.localStorage.getItem('user'));

    console.log(this.vacancy);

    this.userService.getUserById(this.user.id)
      .subscribe(landlord => {
        this.userService.deleteOwnVacancy(landlord, this.vacancy.housingId)
          .subscribe(ll => {
            localStorage.setItem('user', JSON.stringify(ll));
          });
      });

    this.showConfirm = false;
  }

  cancelConfirm() {
    this.showConfirm = false;
  }

}
