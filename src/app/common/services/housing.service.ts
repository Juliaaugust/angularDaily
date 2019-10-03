import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Housing } from '../models/housing.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HousingParams } from '../models/housing-params.model';

@Injectable()
export class HousingService {

  constructor(private http: HttpClient) { }

  getHousings() {
    return this.http.get<Housing[]>(`http://localhost:3000/housing/`);
  }

  getHousingById(id: number) {
    return this.http.get(`http://localhost:3000/housing/${id}`);
  }

  getHousingBySearchParams( params: HousingParams) {

    if ((typeof(params.city) !== 'string')) {
      console.log(params);
      throw new Error('City is not a string');
    }
    const guests = Math.max(+params.guests, 1);

    return this.http.get<Housing[]>(`http://localhost:3000/housing/`, {params: {'address.city': params.city}})

      .pipe(
        map(housings => {
          return housings.sort((item1, item2) => {
            switch (params.sorting) {
              case 'desc':
                return item1.price > item2.price ? -1 : 1;
              case 'rating':
                return this.rating(item1) > this.rating(item2) ? -1 : 1;
              default:
                case 'asc':
                  return item1.price > item2.price ? 1 : -1;
            }
         });
        }
      ),
      map(( housings ) => {
        return housings.filter((item) => {
          return 1
          && (!guests || +item.maxGuests >= guests)
          && (!params.minPrice || item.price >= +params.minPrice)
          && (!params.maxPrice || item.price <= +params.maxPrice)
          && (!params.rating || Math.round(this.rating(item)) >= +params.rating);
        });
     })
      );
  }

  createNewHousing(housing: Housing) {
    return this.http.post('http://localhost:3000/housing', housing);
  }

  rating(item) {
    const ratingValues = [];
    for (let i of item.rating) {
      ratingValues.push(i.value);
    }
    return ratingValues.length > 0 ? ratingValues.reduce((a, b) => a + b) / ratingValues.length : 0;
  }
}
