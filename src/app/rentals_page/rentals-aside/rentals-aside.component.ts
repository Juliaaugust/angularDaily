import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../common/services/housing.service';

@Component({
  selector: 'app-rentals-aside',
  templateUrl: './rentals-aside.component.html',
  styleUrls: ['./rentals-aside.component.sass']
})
export class RentalsAsideComponent implements OnInit {

  // @Output() onApplyParams: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

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
    this.route.queryParams.subscribe(val => {
      console.log(val.arrival);
      console.log(val.departure);
      this.city = val.city;
      this.guests = val.guests;
      this.arrivalDate = val.arrival;
      this.departureDate = val.departure;
    });
    // this.city = this.route.snapshot.queryParams.city;
    // this.guests = +this.route.snapshot.queryParams.guests;
    // console.log(this.city, this.guests);
  }

  applyParams() {
    console.log(this.city);
    console.log(this.route.queryParams);
    this.housingService.getHousingBySearchParams(this.city, this.guests, this.arrivalDate, this.departureDate)
    .subscribe(housings => {
      console.log(housings);
      this.router.navigate(['/rentals'],
        { queryParams: {city: this.city, guests: this.guests, arrival: this.arrivalDate, departure: this.departureDate}});
      console.log(this.city);
    });
    // this.route.queryParams.value.city = this.city;
    // this.onApplyParams.emit(this.city);
  }

}
