import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isAuthoriz = false;
  user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.isAuthoriz = this.authService.isLoggedIn();
    console.log(this.isAuthoriz);
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isAuthoriz = false;
  }

  openAuthPage() {
    this.authService.login();
    this.router.navigate(['/authentication']);
    this.isAuthoriz = this.authService.isLoggedIn();

  }

}
