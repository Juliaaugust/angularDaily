import { Component, OnInit, Input } from '@angular/core';
import { Housing } from '../../common/models/housing.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrls: ['./housing-card.component.sass']
})
export class HousingCardComponent implements OnInit {

  @Input() housing: Housing;

  arrivalDate = '';
  departureDate = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((val) => {
      this.arrivalDate = val.arrivalDate;
      this.departureDate = val.departureDate;
    });
  }

}
