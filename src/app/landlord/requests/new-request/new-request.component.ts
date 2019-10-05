import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() confirmed: EventEmitter<HousingRequest> = new EventEmitter();
  @Output() refused: EventEmitter<HousingRequest> = new EventEmitter();

  housingName = '';

  constructor(private housingService: HousingService) { }

  ngOnInit() {

    this.housingService.getHousingById(this.requestNew.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
      });
  }

  confirmRequest() {
    const request: HousingRequest = this.requestNew;
    this.confirmed.emit(request);
  }

  refuseRequest() {
    const request: HousingRequest = this.requestNew;
    this.refused.emit(request);
  }

}
