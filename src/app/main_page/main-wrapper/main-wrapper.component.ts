import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.sass']
})
export class MainWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.clear();
  }

}
