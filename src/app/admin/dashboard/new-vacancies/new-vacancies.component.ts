import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { UsersService } from 'src/app/common/services/users.service';
import { User } from 'src/app/common/models/user.model';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-new-vacancies',
  templateUrl: './new-vacancies.component.html',
  styleUrls: ['../dashboard.component.sass']
})
export class NewVacanciesComponent implements OnInit {

  @Input() landlordVacancyNew: Vacancy;

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  landlordName: string;

  constructor(private housingService: HousingService, private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserById(this.landlordVacancyNew.landlordId)
      .subscribe((val: User) => {
        this.landlordName = val.name;
      });

    this.housingService.getHousingById(this.landlordVacancyNew.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.house}, ${val.address.street}`;
        this.housingPrice = val.price;
      });
  }

  onApprove(housingId: number) {
    console.log(`${housingId} одобрено!`);
  }

  onReject(housingId: number) {
    console.log(`${housingId} отклонено!`);
  }

}
