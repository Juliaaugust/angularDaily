import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-housing-aside',
  templateUrl: './housing-aside.component.html',
  styleUrls: ['./housing-aside.component.sass']
})
export class HousingAsideComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  rentHouse() {
    this.id = +this.route.snapshot.params.id;
    console.log(this.id);
    this.router.navigate(['/payment', this.id]);
    // проверка на авторизацию
    // проверка на заполнение дат
  }

}
