import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from 'src/app/common/models/housing.model';
import { HousingService } from 'src/app/common/services/housing.service';

@Component({
  selector: 'app-housing-main',
  templateUrl: './housing-main.component.html',
  styleUrls: ['./housing-main.component.sass']
})
export class HousingMainComponent implements OnInit {

  id: number;
  houseInfo: any;

  ratingValue: number;

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
    .subscribe(h => {
      this.houseInfo = h;
      const ratingValues = [];
      for (let i of this.houseInfo.rating) {
        ratingValues.push(i.value);
      }
      this.ratingValue = ratingValues.length > 0 ? ratingValues.reduce((a, b) => a + b) / ratingValues.length : 0;

    });
  }

}
