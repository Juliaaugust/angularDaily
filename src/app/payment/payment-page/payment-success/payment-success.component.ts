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

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.housingService.getHousingById(this.id)
      .subscribe((housing) => {
        console.log(housing);
      });
  }

}
