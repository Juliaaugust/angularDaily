import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../common/models/user.model';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isAuthoriz = true;
  user: User;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  signOut() {
    this.isAuthoriz = false;
    this.authService.login();
    this.router.navigate(['/']);
  }

}
