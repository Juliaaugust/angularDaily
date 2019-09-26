import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  id: number;
  houseInfo: any;

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
    .subscribe(h => {
      this.houseInfo = h;
      console.log(this.houseInfo);
      console.log(this.houseInfo.photos);
    });
  }

}
