import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  payForHousing() {
    this.id = +this.route.snapshot.params.id;
    console.log(this.id);
    this.router.navigate(['/payment', this.id, 'success']);
  }

}
