import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { Router } from '@angular/router';

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

  // query params for edit
  name = ''; type = '';
  country = ''; city = ''; street = ''; house: number;
  description = ''; guests = ''; price: number;

  constructor(private housing: HousingService, private router: Router) { }

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
      });
  }

  editVacancy() {
    const {name, type, city, street, house, description, guests, price} = this;

    this.router.navigate(['/landlord/create'],
      {queryParams: {name, type, city, street, house, description, guests, price}});
  }

  deleteVacancyBtn() {
    this.showConfirm = true;
  }

  deleteVacancyFronConfirm() {
    console.log('Вакансия удалена!');
    this.showConfirm = false;
  }

  cancelConfirm() {
    this.showConfirm = false;
  }

}
