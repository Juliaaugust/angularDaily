import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['../vacancies.component.sass']
})
export class VacancyCardComponent implements OnInit {

  @Input() vacancy: Vacancy;

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  status = '';

  constructor(private housing: HousingService) { }

  ngOnInit() {
    this.status = this.vacancy.status;

    this.housing.getHousingById(this.vacancy.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.house}, ${val.address.street}`;
        this.housingPrice = val.price;
      });
  }

}
