import { Component, OnInit, Input } from '@angular/core';
import { Vacancy } from '../../../common/models/vacancy.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { UsersService } from '../../../common/services/users.service';
import { User } from '../../../common/models/user.model';

@Component({
  selector: 'app-viewed-vacancies',
  templateUrl: './viewed-vacancies.component.html',
  styleUrls: ['../dashboard.component.sass']
})
export class ViewedVacanciesComponent implements OnInit {

  @Input() landlordVacancyViewed: Vacancy;

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  landlordName: string;
  status = '';

  firstPhotoSrc = '../../../assets/images/housing_variants/var_0_1.jpg';

  constructor(private housingService: HousingService, private userService: UsersService) { }

  ngOnInit() {
    this.status = this.landlordVacancyViewed.status;

    this.userService.getUserById(this.landlordVacancyViewed.landlordId)
      .subscribe((val: User) => {
        this.landlordName = val.name;
      });

    this.housingService.getHousingById(this.landlordVacancyViewed.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, д.${val.address.house}`;
        this.housingPrice = val.price;
        if (val.photos[0]) {
          this.firstPhotoSrc = val.photos[0].src;
        }
      });
  }

}
