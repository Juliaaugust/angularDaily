import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { Message } from '../../common/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.sass']
})
export class MainSearchComponent implements OnInit {

  message: Message;

  today = new Date();

  minArrivalDate = this.today.toISOString().slice(0, 10);
  minDeparturelDate = new Date(this.today.setDate(this.today.getDate() + 1)).toISOString().slice(0, 10);

  arrivalDate = this.minArrivalDate;
  departureDate = this.minDeparturelDate;

  guests: number;
  city = '';

  constructor(private router: Router, private housingService: HousingService) { }

  ngOnInit() {
    this.message = new Message('error', '');
  }

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  searchHousing() {

    if (this.city) {
      // this.message.text = '';
      this.housingService.getHousingBySearchParams(this.city, this.guests)
        .subscribe(housings => {
          console.log(housings);
          if (housings) {
            this.message.text = '';
            this.router.navigate(['/rentals'], { queryParams: {city: this.city, guests: this.guests} });
          } else {
            this.showMessage('Жилья с данными параметрами не найдено', 'info');
            console.log('Жилья с данными параметрами не найдено');
          }
        });
    } else {
      this.showMessage('Заполните город!', 'error');
    }
  }

}
