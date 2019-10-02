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
      console.log(this.user);
      this.isAuthenticated = true;
    }

    this.authService
      .watchStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('Subscribe!', isAuthenticated);

        if (!JSON.parse(window.localStorage.getItem('user'))) {
          this.isAuthenticated = false;
        } else {
          this.user = JSON.parse(window.localStorage.getItem('user'));
          console.log(this.user);
          this.isAuthenticated = true;
        }

      });

    // if (this.isAuthenticated) {
    //   this.userService.currentUser.next()
    // }

  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/authentication']);
  }

  openAuthPage() {
    this.router.navigate(['/authentication']);
  }
}
