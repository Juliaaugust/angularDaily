import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user: User;
  isAuthenticated = false;

  sub: Subscription;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // this.user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(this.authService.isLoggedIn());

    this.authService
      .watchStatus()
      // .pipe(takeUntil(this.destroyed$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('Subscribe!', isAuthenticated);
      });

  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openAuthPage() {
    this.router.navigate(['/authentication']);
  }

  // get isAuthoriz() {
  //   return this.authService.isLoggedIn();
  // }

}
