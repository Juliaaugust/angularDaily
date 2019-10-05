import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/common/models/housing.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Review } from '../../common/models/review.model';

@Component({
  selector: 'app-housing-main',
  templateUrl: './housing-main.component.html',
  styleUrls: ['./housing-main.component.sass']
})
export class HousingMainComponent implements OnInit {

  id: number;
  houseInfo: Housing;

  housingName: string;
  housingAddress: string;
  housingDescription: string;
  housingPrice: number;
  maxGuests: number;

  housingReviews: Review[];
  housingRating: {name: string, value: number}[];

  commonRating: number;

  ratingValue: number;

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
      .subscribe(val => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.street}, д.${val.address.house}`;
        this.housingDescription = val.description;
        this.housingPrice = val.price;
        this.maxGuests = +val.maxGuests;
        if (val.reviews) {
          this.housingReviews = val.reviews;
        }
        if (val.rating) {
          this.housingRating = val.rating;
        }

        const ratingValues = [];
        if (val.rating) {
          for (let i of this.housingRating) {
            ratingValues.push(i.value);
          }
          this.commonRating = ratingValues.length > 0 ? ratingValues.reduce((a, b) => a + b) / ratingValues.length : 0;
        }

        this.houseInfo = val;
      });

  }

}
