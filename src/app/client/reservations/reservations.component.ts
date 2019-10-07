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

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.reservations = this.user.reservations;
  }

  allReservations() {
    this.reservations = this.user.reservations;
  }

  currentReservations() {
    this.reservations = this.user.reservations.filter(res => res.status === 'текущее');
  }

  pastReservations() {
    this.reservations = this.user.reservations.filter(res => res.status === 'прошедшее');
  }

  canceledReservations() {
    this.reservations = this.user.reservations.filter(res => res.status === 'отклоненное');
  }

}
