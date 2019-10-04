import { Component, OnInit, Input } from '@angular/core';
import { HousingRequest } from '../../../common/models/housing-reguest.model';
import { HousingService } from '../../../common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['../requests.component.sass']
})
export class NewRequestComponent implements OnInit {

  @Input() requestNew: HousingRequest;

  housingName = '';

  constructor(private housingService: HousingService) { }

  ngOnInit() {

    this.housingService.getHousingById(this.requestNew.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
      });
  }

}
