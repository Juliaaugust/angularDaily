import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { Housing } from '../../common/models/housing.model';
import { User } from '../../common/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/common/models/message.model';
import { Review } from '../../common/models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.sass']
})
export class ReviewComponent implements OnInit {

  reviewForm: FormGroup;

  user: User;
  message: Message;

  ratingValue1 = '5';
  ratingValue2 = '5';
  ratingValue3 = '5';
  ratingValue4 = '5';
  ratingValue5 = '5';
  ratingValue6 = '5';

  ratingValues = [];

  commonRating = 5;

  housingId: number;
  housingName: string;
  housingAddress: string;
  housingDates: string;
  housingPhotoSrc = '../../../assets/images/housing_variants/var_1_1.jpg';

  housing: Housing;

  isClicked = false;

  private showMessage(text: string, type: string = 'error') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.message = new Message('error', '');

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.housingId = +this.route.snapshot.params.id;

    this.housingService.getHousingById(this.housingId)
      .subscribe((housing: Housing) => {
        this.housing = housing;
        this.housingName = housing.name;
        this.housingAddress = `${housing.address.city}, ${housing.address.street}, д.${housing.address.house}`;
        this.housingDates = this.user.reservations.filter(res => res.housingId === this.housingId)[0].dates;
        if (housing.photos[0]) {
          this.housingPhotoSrc = housing.photos[0].src;
        }
      });

    this.reviewForm = new FormGroup({
      advantages: new FormControl('', Validators.required),
      disadvantages: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      rat1: new FormControl(5),
      rat2: new FormControl(5),
      rat3: new FormControl(5),
      rat4: new FormControl(5),
      rat5: new FormControl(5),
      rat6: new FormControl(5),
    });
  }

  setRatingValue1(event: Event) {
    this.ratingValue1 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  setRatingValue2(event: Event) {
    this.ratingValue2 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  setRatingValue3(event: Event) {
    this.ratingValue3 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  setRatingValue4(event: Event) {
    this.ratingValue4 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  setRatingValue5(event: Event) {
    this.ratingValue5 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  setRatingValue6(event: Event) {
    this.ratingValue6 = (event.target as HTMLInputElement).value;
    this.calcCommonRaring();
  }

  calcCommonRaring() {
    this.ratingValues = [
      +this.ratingValue1,
      +this.ratingValue2,
      +this.ratingValue3,
      +this.ratingValue4,
      +this.ratingValue5,
      +this.ratingValue6
    ];
    this.commonRating = this.ratingValues.length > 0 ? this.ratingValues.reduce((a, b) => a + b) / this.ratingValues.length : 0;
  }

  submitReview() {
    this.message.text = '';
    this.isClicked = true;

    if (this.reviewForm.invalid) {
      this.showMessage('Заполните все необхрдимые поля!', 'error');
    } else {
      const formData = {...this.reviewForm.value};
      const {advantages, disadvantages, comment} = formData;
      const date = new Date();
      const review = new Review(
        this.user.name,
        advantages,
        disadvantages,
        comment,
        date.toString(),
        this.commonRating
      );

      // tslint:disable-next-line: forin
      for (let i in this.housing.rating) {
        this.housing.rating[i].value = (this.ratingValues[i] + this.housing.rating[i].value) / 2;
      }

      this.housingService.addReview(this.housing, review)
        .subscribe();

      console.log(review);
      this.showMessage('Отзыв был успешно добавлен!', 'info');

      this.reviewForm.reset();
      this.isClicked = false;
    }

  }

}
