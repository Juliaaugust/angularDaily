import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../common/models/user.model';
import { Reservation } from '../../common/models/reservation.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.sass']
})
export class ReservationsComponent implements OnInit {

  user: User;
  reservations: Reservation[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.reservations = this.user.reservations;
    console.log(this.reservations);
  }

}
