import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rentals-aside',
  templateUrl: './rentals-aside.component.html',
  styleUrls: ['./rentals-aside.component.sass']
})
export class RentalsAsideComponent implements OnInit, DoCheck {

  constructor(private route: ActivatedRoute) { }

  city: string;
  guests: number;

  today = new Date();

  minArrivalDate = this.today.toISOString().slice(0, 10);
  minDeparturelDate = new Date(this.today.setDate(this.today.getDate() + 1)).toISOString().slice(0, 10);

  arrivalDate = this.minArrivalDate;
  departureDate = this.minDeparturelDate;

  minPrice = '';
  maxPrice = '';
  ratingValue = '3';

  setRatingValue(event: Event) {
    this.ratingValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
    this.city = this.route.snapshot.queryParams.city;
    this.guests = +this.route.snapshot.queryParams.guests;
    console.log(this.city, this.guests);
  }

  ngDoCheck() {
    // console.log('Change rent!');
  }

}
