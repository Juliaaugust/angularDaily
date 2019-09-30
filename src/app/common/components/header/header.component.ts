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

  id: number;

  // sub: Subscription;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.user);

    // if (this.user) {
    //   this.isAuthenticated = true;
    // }

    this.authService
      .watchStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        console.log('Subscribe!', isAuthenticated);
        // this.user = JSON.parse(window.localStorage.getItem('user'));
        // console.log(this.user);

      });

      // this.userService.getUserById()

    // this.route.paramMap.subscribe(params => {
    //     this.id = +params.get('id');
    //     console.log(this.id);
    //   });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/authentication']);
  }

  openAuthPage() {
    this.router.navigate(['/authentication']);
  }
}
