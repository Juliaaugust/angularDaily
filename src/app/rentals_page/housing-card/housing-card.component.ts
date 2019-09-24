import { Component, OnInit, Input } from '@angular/core';
import { Housing } from '../../common/models/housing.model';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrls: ['./housing-card.component.sass']
})
export class HousingCardComponent implements OnInit {

  @Input() housing: Housing;

  constructor() { }

  ngOnInit() {
  }

}
