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

  allVacancies() {
    this.vacancies = this.user.vacancies;
  }

  approvedVacancies() {
    this.vacancies = this.user.vacancies.filter(vac => vac.status === 'одобрено');
  }

  rejectedVacancies() {
    this.vacancies = this.user.vacancies.filter(vac => vac.status === 'отклонено');
  }

  considerationsVacancies() {
    this.vacancies = this.user.vacancies.filter(vac => vac.status === 'на рассмотрении');
  }

}
