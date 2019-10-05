import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { Housing } from '../../models/housing.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  id: number;
  houseInfo: Housing;
  housingPhotos: {id: number, src: string}[];

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
    .subscribe(val => {
      this.houseInfo = val;
      this.housingPhotos = val.photos;
      console.log(this.houseInfo);
      console.log(this.housingPhotos);
    });
  }

}
