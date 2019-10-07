import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../../../common/models/reservation.model';
import { HousingService } from '../../../common/services/housing.service';
import { Housing } from '../../../common/models/housing.model';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['../reservations.component.sass']
})
export class ReservationCardComponent implements OnInit {

  @Input() reservation: Reservation;

  housingName = '';
  housingAddress = '';
  firstPhotoSrc = '../../../assets/images/housing_variants/var_0_1.jpg';

  constructor(private housing: HousingService) { }

  ngOnInit() {
    this.housing.getHousingById(this.reservation.housingId)
      .subscribe((val: Housing) => {
        this.housingName = val.name;
        this.housingAddress = `${val.address.city}, ${val.address.house}, ${val.address.street}`;
        if (val.photos) {
          this.firstPhotoSrc = val.photos[0].src;
        }
      });
  }

}
