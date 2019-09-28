import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentals-aside',
  templateUrl: './rentals-aside.component.html',
  styleUrls: ['./rentals-aside.component.sass']
})
export class RentalsAsideComponent implements OnInit {

  constructor() { }

  ratingValue = '3';

  setRatingValue(event: Event) {
    this.ratingValue = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
  }

}
