import { Component, OnInit, Input } from '@angular/core';
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

  housingName = '';
  housingAddress = '';
  housingPrice: number;
  landlordName: string;

  firstPhotoSrc = '../../../assets/images/housing_variants/var_0_1.jpg';

  message: Message;

  private showMessage(text: string, type: string = 'info') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  constructor(private housingService: HousingService, private userService: UsersService) { }

  ngOnInit() {
    this.message = new Message('info', '');

    this.userService.getUserById(this.landlordVacancyNew.landlordId)
      .subscribe((val: User) => {
        this.landlordName = val.name;
      });

    this.housingService.getHousingById(this.landlordVacancyNew.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, д.${val.address.house}`;
        this.housingPrice = val.price;
        if (val.photos) {
          this.firstPhotoSrc = val.photos[0].src;
        }
      });
  }

  onApprove(housingId: number) {
    this.showMessage(`Вакансия «${this.housingName}» одобрена!`, 'info');
  }

  onReject(housingId: number) {
    this.showMessage(`Вакансия «${this.housingName}» отклонена!`, 'info');
  }

}
