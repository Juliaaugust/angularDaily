import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HousingService } from '../../common/services/housing.service';
import { Housing } from 'src/app/common/models/housing.model';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subject } from 'rxjs';

@Component({
  selector: 'app-rentals-wrapper',
  templateUrl: './rentals-wrapper.component.html',
  styleUrls: ['./rentals-wrapper.component.sass']
})
export class RentalsWrapperComponent implements OnInit, OnDestroy {

  @Input() cityFromAside: string;

  constructor(private housingService: HousingService, private route: ActivatedRoute) { }

  housings: Housing[] = [];


  private destroyed$: Subject<void> = new Subject<void>();

  ngOnInit() {

    const city = this.route.snapshot.queryParams.city;
    const guests = this.route.snapshot.queryParams.guests;

    console.log(this.route);

    this.housingService.getHousingBySearchParams(city, guests)
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(housings => {
        this.housings = housings;
      });

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
