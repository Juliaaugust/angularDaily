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

  // @Input() housing: Housing;
  id: number;
  houseInfo: any;

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
    .subscribe(h => {
      this.houseInfo = h;
      console.log(this.houseInfo);
      console.log(this.houseInfo.rating.names);
    });
  }

}
