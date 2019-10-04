import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Message } from '../../common/models/message.model';

@Component({
  selector: 'app-housing-aside',
  templateUrl: './housing-aside.component.html',
  styleUrls: ['./housing-aside.component.sass']
})
export class HousingAsideComponent implements OnInit {

  id: number;
  isAuthenticated: boolean;
  message: Message;

  today = new Date();

  minArrivalDate = this.today.toISOString().slice(0, 10);
  minDeparturelDate = new Date(this.today.setDate(this.today.getDate() + 1)).toISOString().slice(0, 10);

  arrivalDate = this.minArrivalDate;
  departureDate = this.minDeparturelDate;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.message = new Message('error', '');

    if (!JSON.parse(window.localStorage.getItem('user'))) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }

    this.route.queryParams.subscribe((val) => {
      this.arrivalDate = val.arrivalDate;
      this.departureDate = val.departureDate;
    });
  }

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

  rentHouse() {
    this.id = +this.route.snapshot.params.id;
    const {arrivalDate, departureDate} = this;
    console.log(this.id);
    if (this.isAuthenticated) {
      if (arrivalDate && departureDate) {
        this.router.navigate(['/payment', this.id], {queryParams: {arrivalDate, departureDate}});
      } else {
        this.showMessage('Заполните даты заезда и отъезда!', 'error');
      }
    } else {
      this.showMessage('Для бронирования жилья необходимо авторизоваться', 'error');
    }

  }

}
