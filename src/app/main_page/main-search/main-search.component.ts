import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { Message } from '../../common/models/message.model';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Housing } from '../../common/models/housing.model';

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

  guests: string;
  city: string;

  cityControl = new FormControl();

  allCities: string[] = [];
  cities: string[] = [];

  constructor(private router: Router, private housingService: HousingService) { }

  ngOnInit() {
    this.message = new Message('error', '');

    this.housingService.getHousings()
      .subscribe((vals: Housing[]) => {
        for (let val of vals) {
          this.allCities.push(val.address.city);
          this.cities = this.allCities.filter( this.onlyUnique );
        }
      });
  }

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

  searchHousing() {

    const {city, arrivalDate, departureDate} = this;
    const guests = (Math.max(+this.guests, 1 ) || 1).toString();

    if (this.city) {
      this.message.text = '';
      this.housingService.getHousingBySearchParams({city, guests, arrivalDate, departureDate})
        .subscribe(housings => {
          // console.log(housings);
          if (housings[0]) {
            this.message.text = '';
            this.router.navigate(['/rentals'],
              { queryParams: {city, guests, arrivalDate, departureDate}});
          } else {
            this.showMessage('Жилье с данными параметрами не найдено', 'info');
          }
        });
    } else {
      this.showMessage('Заполните город!', 'error');
    }

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
