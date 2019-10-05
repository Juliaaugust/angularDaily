import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Message } from '../../common/models/message.model';
import { HousingService } from '../../common/services/housing.service';
import { Housing } from '../../common/models/housing.model';
import { User } from 'src/app/common/models/user.model';
import { UsersService } from '../../common/services/users.service';
import { HousingRequest } from '../../common/models/housing-reguest.model';
import { Reservation } from '../../common/models/reservation.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit {

  message: Message;

  paymentForm: FormGroup;

  user: User;
  landlordId: number;

  isChangeDisabled = false;

  id: number;

  housingName = '';
  maxGuests = 10;
  price = 0;
  diffDays = 0;
  cost = 0;

  arrivalDateStr = '';
  departureDateStr = '';

  date = new Date().toISOString().slice(0, 10);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService,
    private userService: UsersService
  ) { }


  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  ngOnInit() {

    this.route.queryParams.subscribe((val) => {
      this.arrivalDateStr = val.arrivalDate;
      this.departureDateStr = val.departureDate;
    });

    const arrivalParts = this.arrivalDateStr.split('-');
    const departureParts = this.departureDateStr.split('-');

    const arrivalDate = new Date(+arrivalParts[0], +arrivalParts[1] - 1, +arrivalParts[2]);
    const departureDate = new Date(+departureParts[0], +departureParts[1] - 1, +departureParts[2]);

    const diffTime = Math.abs(+departureDate - +arrivalDate);
    this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.id = +this.route.snapshot.params.id;

    this.housingService.getHousingById(this.id)
      .subscribe((housing) => {
        // console.log(housing);
        this.housingName = housing.name;
        this.price = housing.price;
        this.maxGuests = +housing.maxGuests;
        this.cost = this.diffDays * this.price;
        this.landlordId = housing.landlordId;
      });


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

    // console.log(guestInfo);

    // console.log((this.paymentForm.get('guestInfoArr') as FormArray).controls);
  }

  removeGuest(idx: number) {
    const guests = this.paymentForm.get('guestInfoArr') as FormArray;
    guests.removeAt(guests.value.findIndex(guest => guest.id === idx));
  }

  payForHousing() {

    const formData = {...this.paymentForm.value};

    if (formData.payMethod) {
      const currentUser = JSON.parse(window.localStorage.getItem('user'));
      const reqStatus = 'new';
      const request = new HousingRequest(
        this.id,
        this.arrivalDateStr,
        formData.arrivalTime,
        this.departureDateStr,
        formData.departureTime,
        formData.guestsCount,
        formData.target,
        formData.comment,
        formData.payMethod,
        this.cost,
        currentUser.name,
        reqStatus
      );

      const resStatus = 'текущее';
      const datesStr = `${this.arrivalDateStr.split('-').join(':')} – ${this.departureDateStr.split('-').join(':')}`;
      const reservation = new Reservation(this.id, resStatus, datesStr);

      console.log('landlordId', this.landlordId);

      this.userService.getUserById(this.landlordId)
        .subscribe((landlord: User) => {
          console.log('landlord', landlord);
          this.userService.addRequest(landlord, request)
            .subscribe((llAddReq) => {
              // console.log('llAddReq', llAddReq);
            });
        });

      this.userService.addOwnReservation(currentUser, reservation)
        .subscribe(user => {
          window.localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/payment', this.id, 'success'],
          { queryParams:
            {
              date: this.date,
              days: this.diffDays,
              cost: this.cost,
              email: currentUser.email
          }});
        });

    } else {
      this.showMessage('Необходимо выбрать способ оплаты!', 'error');
    }
  }

  changeDisabledField() {
    this.isChangeDisabled = !this.isChangeDisabled;
    setTimeout(() => {
      this.isChangeDisabled = false;
    }, 2000);
  }
}
