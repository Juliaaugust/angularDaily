import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { Message } from '../../common/models/message.model';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    }, 2500);
  }

  searchHousing() {

    if (this.city) {
      if (!this.guests) {
        this.guests = 1;
      }
      this.message.text = '';
      this.housingService.getHousingBySearchParams(this.city, this.guests)
        .subscribe(housings => {
          // console.log(housings);
          if (housings[0]) {
            this.message.text = '';
            this.router.navigate(['/rentals'], { queryParams: {city: this.city, guests: this.guests}});
          } else {
            this.showMessage('Жилье с данными параметрами не найдено', 'info');
          }
        });
    } else {
      this.showMessage('Заполните город!', 'error');
    }

  }

}
