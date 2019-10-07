import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { User } from '../../common/models/user.model';
import { Vacancy } from 'src/app/common/models/vacancy.model';
import { UsersService } from '../../common/services/users.service';
import { Message } from 'src/app/common/models/message.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private housingService: HousingService, private userService: UsersService) { }

  housings: Housing[] = [];
  landlordVacancies: Vacancy[];
  landlordVacanciesNew: Vacancy[] = [];
  landlordVacanciesViewed: Vacancy[] = [];
  admin: User;

  message: Message;

  private showMessage(text: string, type: string = 'info') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  ngOnInit() {
    this.message = new Message('info', '');

    this.admin = JSON.parse(window.localStorage.getItem('user'));
    this.landlordVacancies = this.admin.landlordVacancies;

    for (const llv of this.landlordVacancies) {
      if (llv.status === 'на рассмотрении') {
        this.landlordVacanciesNew.push(llv);
      } else {
        this.landlordVacanciesViewed.push(llv);
      }
    }
  }

  approveVacancy(vacancy: Vacancy) {
    this.housingService.getHousingById(vacancy.housingId)
      .subscribe(housing => {
        housing.isVisible = true;
        this.housingService.changeVisible(housing)
          .subscribe();
      });

    this.userService.changeLandlordVacancyStatus(this.admin, vacancy.housingId, 'одобрено')
      .subscribe(admin => {
        localStorage.setItem('user', JSON.stringify(admin));
      });

    this.userService.getUserById(vacancy.landlordId)
      .subscribe(landlord => {
        this.userService.changeOwnVacancyStatus(landlord, vacancy.housingId, 'одобрено')
          .subscribe();
      });

    this.landlordVacanciesNew = this.landlordVacanciesNew.filter(vac => vac.housingId !== vacancy.housingId);
    vacancy.status = 'одобрено';
    this.landlordVacanciesViewed.unshift(vacancy);

    this.showMessage(`Вакансия одобрена!`, 'info');
  }

  rejectVacancy(vacancy: Vacancy) {
    this.userService.changeLandlordVacancyStatus(this.admin, vacancy.housingId, 'отклонено')
      .subscribe(admin => {
        localStorage.setItem('user', JSON.stringify(admin));
      });

    this.userService.getUserById(vacancy.landlordId)
      .subscribe(landlord => {
        this.userService.changeOwnVacancyStatus(landlord, vacancy.housingId, 'отклонено')
          .subscribe();
      });

    vacancy.status = 'отклонено';
    this.landlordVacanciesNew = this.landlordVacanciesNew.filter(vac => vac.housingId !== vacancy.housingId);
    this.landlordVacanciesViewed.unshift(vacancy);

    this.showMessage(`Вакансия отклонена!`, 'info');
  }

}
