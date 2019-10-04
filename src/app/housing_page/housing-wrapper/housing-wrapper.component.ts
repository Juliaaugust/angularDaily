import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/common/services/housing.service';

@Component({
  selector: 'app-housing-wrapper',
  templateUrl: './housing-wrapper.component.html',
  styleUrls: ['./housing-wrapper.component.sass']
})
export class HousingWrapperComponent implements OnInit {

  id: number;

  showAside: boolean;

  constructor(
    private route: ActivatedRoute,
    private hosingService: HousingService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.hosingService.getHousingById(this.id)
    .subscribe(h => {
      if (h.isVisible) {
        this.showAside = true;
      } else {
        this.showAside = false;
      }
    });
  }

}
