import { Component, OnInit, Input } from '@angular/core';
import { HousingRequest } from '../../../common/models/housing-reguest.model';
import { HousingService } from 'src/app/common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-viewed-request',
  templateUrl: './viewed-request.component.html',
  styleUrls: ['../requests.component.sass']
})
export class ViewedRequestComponent implements OnInit {

  @Input() requestViewed: HousingRequest;

  housingName = '';

  constructor(private housingService: HousingService) { }

  ngOnInit() {

    this.housingService.getHousingById(this.requestViewed.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
      });
  }

}
