import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute,

    public ref: ChangeDetectorRef) {
      this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(this.onQueryParamsChange.bind(this));
    }

  housings: Housing[] = [];

  public isLoading = false;

  private destroyed$: Subject<void> = new Subject<void>();

  ngOnInit() {
  }

  onQueryParamsChange(queryParams) {

    this.isLoading = true;

    const {city, guests, arrival, departure} = queryParams;
    this.housingService.getHousingBySearchParams(queryParams)
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe(housings => {
      this.housings = housings;
      this.isLoading = false;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
