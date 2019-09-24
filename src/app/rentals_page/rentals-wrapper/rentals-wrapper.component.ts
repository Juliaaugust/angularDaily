import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-rentals-wrapper',
  templateUrl: './rentals-wrapper.component.html',
  styleUrls: ['./rentals-wrapper.component.sass']
})
export class RentalsWrapperComponent implements OnInit {

  constructor(private hosingService: HousingService) { }

  housings: Housing[] = [];

  ngOnInit() {
    this.hosingService.getHousings()
      .subscribe(h => {
        this.housings = h;
      });
  }

}
