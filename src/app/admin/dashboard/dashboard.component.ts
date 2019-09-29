import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private hosingService: HousingService) { }

  housings: Housing[] = [];

  ngOnInit() {
    this.hosingService.getHousings()
      .subscribe(h => {
        this.housings = h;
      });
  }

}
