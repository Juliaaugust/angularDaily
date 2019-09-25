import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnChanges {

  isAuthoriz = false;
  user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // this.user = JSON.parse(window.localStorage.getItem('user'));
    // this.isAuthoriz = this.authService.isLoggedIn();
    // console.log(this.isAuthoriz);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.user = JSON.parse(window.localStorage.getItem('user'));
    this.isAuthoriz = this.authService.isLoggedIn();
    console.log(this.isAuthoriz);
    console.log(changes);
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openAuthPage() {
    this.authService.login();
    this.router.navigate(['/authentication']);
  }

}
