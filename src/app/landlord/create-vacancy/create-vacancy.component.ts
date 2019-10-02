import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.sass']
})
export class CreateVacancyComponent implements OnInit {

  createForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm = new FormGroup({
      guestInfo: new FormGroup({
        name: new FormControl(''),
        tel: new FormControl('')
      }),
    });
  }

}
