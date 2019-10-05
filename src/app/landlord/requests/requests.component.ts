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

    // this.updateRequestList();
  }

  refuseRequest(request: HousingRequest) {
    request.status = 'Отклонено';
    console.log(request);

    // this.updateRequestList();
  }

  // updateRequestList() {

  //   this.userService.getUserById(this.landlordId)
  //     .subscribe(landlord => {
  //       window.localStorage.setItem('user', JSON.stringify(landlord));
  //       this.requests = landlord.requests;

  //     });
  // }

}
