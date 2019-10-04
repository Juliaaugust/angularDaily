import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../../common/services/housing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass']
})
export class PaymentSuccessComponent implements OnInit {

  id: number;
  housingName: string;
  payDate: string;
  days: string;
  cost: string;
  userEmail: string;

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit() {

    this.payDate = this.route.snapshot.queryParams.date;
    this.cost = this.route.snapshot.queryParams.cost;
    this.days = this.route.snapshot.queryParams.days;
    this.userEmail = this.route.snapshot.queryParams.email;

    this.id = +this.route.snapshot.params.id;
    this.housingService.getHousingById(this.id)
      .subscribe((housing) => {
        this.housingName = housing.name;
      });
  }

}
