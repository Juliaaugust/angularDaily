import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user: User;
  isAuthenticated: boolean;

  showConfirm = false;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!JSON.parse(window.localStorage.getItem('user'))) {
      this.isAuthenticated = false;
    } else {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.isAuthenticated = true;
    }

    this.authService
      .watchStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;

        if (!JSON.parse(window.localStorage.getItem('user'))) {
          this.isAuthenticated = false;
        } else {
          this.user = JSON.parse(window.localStorage.getItem('user'));
          this.isAuthenticated = true;
        }

      });

    // if (this.isAuthenticated) {
    //   this.userService.currentUser.next()
    // }

  }

  signOut() {
    this.showConfirm = true;
  }

  signOutFromConfirm() {
    this.authService.logout();
    this.router.navigate(['/authentication']);
    this.showConfirm = false;
  }

  cancelConfirm() {
    this.showConfirm = false;
  }

  openAuthPage() {
    this.router.navigate(['/authentication']);
  }

}
