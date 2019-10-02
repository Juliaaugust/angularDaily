import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit {

  paymentForm: FormGroup;

  id: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.paymentForm = new FormGroup(
      {
        arrivalTime: new FormControl('14:00'),
        departureTime: new FormControl('12:00'),

        guestInfoArr: new FormArray([]),

        // guestInfo: new FormGroup({
        //   name: new FormControl(''),
        //   tel: new FormControl(''),
        //   email: new FormControl('', [Validators.email, Validators.required]),
        // }),

        pets: new FormControl(false),
        target: new FormControl('Выбор цели'),
        comment: new FormControl(''),
        payMethod: new FormControl(null)
      });
  }

  payForHousing() {
    this.id = +this.route.snapshot.params.id;
    console.log(this.id);
    this.router.navigate(['/payment', this.id, 'success']);
    console.log(this.paymentForm.value);
    console.log((this.paymentForm.get('guestInfoArr') as FormArray).length);

  }

  addGuest() {
    const guestInfo = new FormControl('');
    // const guestInfo = new FormGroup({
    //     name: new FormControl(''),
    //     tel: new FormControl(''),
    //     email: new FormControl(''),
    //   });
    (this.paymentForm.get('guestInfoArr') as FormArray).push(guestInfo);

    console.log(guestInfo);

    console.log((this.paymentForm.get('guestInfoArr') as FormArray).controls);
  }

  removeGuest(idx: number) {
    console.log(idx);
    const guests = this.paymentForm.get('guestInfoArr') as FormArray;
    guests.removeAt(guests.value.findIndex(guest => guest.id === idx));

    // console.log((this.paymentForm.get('guestInfoArr') as FormArray));
  }

}
