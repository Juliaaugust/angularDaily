import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.sass']
})
export class MainSearchComponent implements OnInit {

  today = new Date();

  minArrivalDate = this.today.toISOString().slice(0, 10);
  minDeparturelDate = new Date(this.today.setDate(this.today.getDate() + 1)).toISOString().slice(0, 10);

  arrivalDate = this.minArrivalDate;
  departureDate = this.minDeparturelDate;

  guests: number;
  city = '';

  constructor() { }

  ngOnInit() {
  }

  info() {
    if (!this.guests) {
      this.guests = 2;
    }
    console.log(this.guests);
    console.log(this.city);
    console.log(this.arrivalDate);
    console.log(this.departureDate);
  }
}
