import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { User } from '../../common/models/user.model';
import { Vacancy } from 'src/app/common/models/vacancy.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  housings: Housing[] = [];
  landlordVacancies: Vacancy[];
  landlordVacanciesNew: Vacancy[] = [];
  landlordVacanciesViewed: Vacancy[] = [];
  user: User;

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.landlordVacancies = this.user.landlordVacancies;

    for (const llv of this.landlordVacancies) {
      if (llv.status === 'на рассмотрении') {
        this.landlordVacanciesNew.push(llv);
      } else {
        this.landlordVacanciesViewed.push(llv);
      }
    }
  }

}
