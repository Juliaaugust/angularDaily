import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.sass']
})
export class ReviewComponent implements OnInit {

  ratingValue1 = '5';
  ratingValue2 = '5';
  ratingValue3 = '5';
  ratingValue4 = '5';
  ratingValue5 = '5';
  ratingValue6 = '5';

  constructor() { }

  ngOnInit() {
  }

  submitReview() {

  }

  setRatingValue1(event: Event) {
    this.ratingValue1 = (event.target as HTMLInputElement).value;
  }

  setRatingValue2(event: Event) {
    this.ratingValue2 = (event.target as HTMLInputElement).value;
  }

  setRatingValue3(event: Event) {
    this.ratingValue3 = (event.target as HTMLInputElement).value;
  }

  setRatingValue4(event: Event) {
    this.ratingValue4 = (event.target as HTMLInputElement).value;
  }

  setRatingValue5(event: Event) {
    this.ratingValue5 = (event.target as HTMLInputElement).value;
  }

  setRatingValue6(event: Event) {
    this.ratingValue6 = (event.target as HTMLInputElement).value;
  }

}
