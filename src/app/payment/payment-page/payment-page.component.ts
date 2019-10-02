import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Message } from '../../common/models/message.model';
import { HousingService } from '../../common/services/housing.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit {

  message: Message;

  paymentForm: FormGroup;

  id: number;

  maxGuests = 10;
  price = 8000;

  arrivalDateStr = new Date().toISOString().slice(0, 10);
  departureDateStr = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);

  arrivalParts = this.arrivalDateStr.split('-');
  departureParts = this.departureDateStr.split('-');

  arrivalDate = new Date(+this.arrivalParts[0], +this.arrivalParts[1] - 1, +this.arrivalParts[2]);
  departureDate = new Date(+this.departureParts[0], +this.departureParts[1] - 1, +this.departureParts[2]);

  diffTime = Math.abs(+this.departureDate - +this.arrivalDate);
  diffDays = Math.ceil(this.diffTime / (1000 * 60 * 60 * 24)); // количество дней, кот нужно умножить на цену

  cost: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) { }


  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  ngOnInit() {
    this.cost = this.price * this.diffDays;

    console.log(this.diffDays);
    this.id = +this.route.snapshot.params.id;
    console.log(this.id);
    this.housingService.getHousingById(this.id)
      .subscribe(housing => {
        console.log(housing);
        // console.log(housing.price);
        // console.log(housing.maxGuests);
      });

    // console.log(hh);

    this.message = new Message('error', '');

    this.paymentForm = new FormGroup(
      {
        arrivalTime: new FormControl('14:00'),
        departureTime: new FormControl('12:00'),

        guestsCount: new FormControl('2', [Validators.required, Validators.min(1), Validators.max(this.maxGuests)]),
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
  }

  payForHousing() {

    const {arrivalTime, comment, departureTime, payMethod, pets, target} = this.paymentForm.value;
    // const arrivalTime = this.paymentForm.value.arrivalTime;
    // const payMethod = this.paymentForm.value.payMethod;
    // const guestsCount = (this.paymentForm.get('guestInfoArr') as FormArray).length;

    if (payMethod) {
      // this.id = +this.route.snapshot.params.id;
      console.log(this.id);
      this.router.navigate(['/payment', this.id, 'success']);
    } else {
      this.showMessage('Необходимо выбрать способ оплаты!', 'error');
    }

  }
}
