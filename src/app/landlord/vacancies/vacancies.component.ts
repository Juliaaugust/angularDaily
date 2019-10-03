import { Component, OnInit } from '@angular/core';
import { Vacancy } from '../../common/models/vacancy.model';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.sass']
})
export class VacanciesComponent implements OnInit {

  user: User;
  vacancies: Vacancy[];

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.vacancies = this.user.vacancies;
  }

}
