import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Message } from '../../common/models/message.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit {

  message: Message;

  paymentForm: FormGroup;

  id: number;

  arrivalDate = new Date().toISOString().slice(0, 10);
  departureDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);

  constructor(private route: ActivatedRoute, private router: Router) { }

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  ngOnInit() {
    this.message = new Message('error', '');

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
    const guestsCount = (this.paymentForm.get('guestInfoArr') as FormArray).length;

    if (payMethod) {
      this.id = +this.route.snapshot.params.id;
      console.log(this.id);
    } else {
      this.showMessage('Необходимо выбрать способ оплаты!', 'error');
    }

    this.router.navigate(['/payment', this.id, 'success']);

  }
}
