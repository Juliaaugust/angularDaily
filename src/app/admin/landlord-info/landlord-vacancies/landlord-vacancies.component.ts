import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { Housing } from '../../../common/models/housing.model';
import { HousingService } from 'src/app/common/services/housing.service';

@Component({
  selector: 'app-landlord-vacancies',
  templateUrl: './landlord-vacancies.component.html',
  styleUrls: ['../landlord-info.component.sass']
})
export class LandlordVacanciesComponent implements OnInit {

  @Input() llVacancy: Vacancy;

  housingName = '';
  housingAddress = '';
  housingPrice: number;

  constructor(private housingService: HousingService) { }

  ngOnInit() {
    this.housingService.getHousingById(this.llVacancy.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, ${val.address.house}`;
        this.housingPrice = val.price;
      });
  }

}
