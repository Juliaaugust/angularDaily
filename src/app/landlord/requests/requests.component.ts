import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user.model';
import { HousingRequest } from '../../common/models/housing-reguest.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent implements OnInit {

  landlord: User;
  requests: HousingRequest[] = [];
  requestsNew: HousingRequest[] = [];
  requestsViewed: HousingRequest[] = [];

  constructor() { }

  ngOnInit() {
    this.landlord = JSON.parse(window.localStorage.getItem('user'));
    this.requests = this.landlord.requests;

    for (const req of this.requests) {
      if (req.status === 'new') {
        this.requestsNew.push(req);
      } else {
        this.requestsViewed.push(req);
      }
    }
  }

}
