import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user.model';
import { HousingRequest } from '../../common/models/housing-reguest.model';
import { UsersService } from '../../common/services/users.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent implements OnInit {

  landlord: User;
  // landlordId: number;
  requests: HousingRequest[] = [];
  requestsNew: HousingRequest[] = [];
  requestsViewed: HousingRequest[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.landlord = JSON.parse(window.localStorage.getItem('user'));
    // this.landlordId = JSON.parse(window.localStorage.getItem('user')).id;
    this.requests = this.landlord.requests;

    for (const req of this.requests) {
      if (req.status === 'new') {
        this.requestsNew.push(req);
      } else {
        this.requestsViewed.push(req);
      }
    }

  }

  confirmRequest(request: HousingRequest) {
    request.status = 'Принято';
    console.log(request);

    this.userService.getUserById(this.landlord.id)
      .subscribe(user => {
        this.userService.changeRequestStatus(user, request, 'Принято')
          .subscribe(ll => {
            localStorage.setItem('user', JSON.stringify(ll));
          });
      });

    this.requestsNew = this.requestsNew.filter(req => req.id !== request.id);
    this.requestsViewed.unshift(request);

  }

  refuseRequest(request: HousingRequest) {
    request.status = 'Отклонено';
    console.log(request);

    this.userService.getUserById(this.landlord.id)
      .subscribe(user => {
        this.userService.changeRequestStatus(user, request, 'Отклонено')
          .subscribe(ll => {
            localStorage.setItem('user', JSON.stringify(ll));
          });
      });

    this.requestsNew = this.requestsNew.filter(req => req.id !== request.id);
    this.requestsViewed.unshift(request);
  }


}
