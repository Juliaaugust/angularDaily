import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../common/services/housing.service';
import { filter } from 'rxjs/operators';
import { HousingParams } from '../../common/models/housing-params.model';

@Component({
  selector: 'app-rentals-aside',
  templateUrl: './rentals-aside.component.html',
  styleUrls: ['./rentals-aside.component.sass']
})
export class RentalsAsideComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

  city: string;
  guests: string;

  today = new Date();

  minArrivalDate = this.today.toISOString().slice(0, 10);
  minDeparturelDate = new Date(this.today.setDate(this.today.getDate() + 1)).toISOString().slice(0, 10);

  arrivalDate = this.minArrivalDate;
  departureDate = this.minDeparturelDate;

  minPrice = '';
  maxPrice = '';
  minRatingValue = '3';

  sortingType: 'default' | 'asc' | 'desc' | 'rating' = 'default';

  setRatingValue(event: Event) {
    this.minRatingValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((val: HousingParams) => {
      this.city = val.city;
      this.guests = (Math.max(+val.guests, 1 ) || 1).toString();
      this.arrivalDate = val.arrivalDate;
      this.departureDate = val.departureDate;
      this.minPrice = val.minPrice;
      this.maxPrice = val.maxPrice;
      if (['default', 'asc', 'desc', 'rating'].includes(val.sorting)) {
        this.sortingType = val.sorting as any;
      }
      if (val.rating) {
        this.minRatingValue = val.rating;
      }
    });
  }

  applyParams() {

    const routeParams = this.getParams();

    this.housingService.getHousingBySearchParams(routeParams)
    .subscribe(housings => {
      console.log(housings);
      this.router.navigate(['/rentals'], {queryParams: routeParams});
      console.log(this.city);
    });

  }

  getParams(): HousingParams {
    return {
        city: this.city,
        guests: this.guests,
        arrivalDate: this.arrivalDate,
        departureDate: this.departureDate,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        rating: this.minRatingValue,
        sorting: this.sortingType
      };
  }

}
