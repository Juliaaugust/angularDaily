import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  isRegistered = true;
  changeTab() {
    this.isRegistered = !this.isRegistered;
  }

  // isRegistered() {
  //   return !this.cond;
  // }

  ngOnInit() {
  }

}
