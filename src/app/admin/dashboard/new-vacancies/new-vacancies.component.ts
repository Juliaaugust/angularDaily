import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { UsersService } from 'src/app/common/services/users.service';
import { User } from 'src/app/common/models/user.model';
import { Housing } from 'src/app/common/models/housing.model';
import { Message } from '../../../common/models/message.model';

@Component({
  selector: 'app-new-vacancies',
  templateUrl: './new-vacancies.component.html',
  styleUrls: ['../dashboard.component.sass']
})
export class NewVacanciesComponent implements OnInit {

  @Input() landlordVacancyNew: Vacancy;

  @Output() approve: EventEmitter<Vacancy> = new EventEmitter();
  @Output() reject: EventEmitter<Vacancy> = new EventEmitter();

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  landlordName: string;

  firstPhotoSrc = '../../../assets/images/housing_variants/var_0_1.jpg';

  constructor(private housingService: HousingService, private userService: UsersService) { }

  ngOnInit() {

    this.userService.getUserById(this.landlordVacancyNew.landlordId)
      .subscribe((val: User) => {
        this.landlordName = val.name;
      });

    this.housingService.getHousingById(this.landlordVacancyNew.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, д.${val.address.house}`;
        this.housingPrice = val.price;
        if (val.photos[0]) {
          this.firstPhotoSrc = val.photos[0].src;
        }
      });
  }

  onApprove() {
    const vacancy = new Vacancy(
      this.landlordVacancyNew.housingId,
      this.landlordVacancyNew.status,
      this.landlordVacancyNew.landlordId
    );
    this.approve.emit(vacancy);
  }

  onReject() {
    const vacancy = new Vacancy(
      this.landlordVacancyNew.housingId,
      this.landlordVacancyNew.status,
      this.landlordVacancyNew.landlordId
    );
    this.reject.emit(vacancy);
  }

}
