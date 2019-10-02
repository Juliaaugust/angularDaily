import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Housing } from '../models/housing.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HousingService {

  constructor(private http: HttpClient) { }

  getHousings() {
    return this.http.get<Housing[]>(`http://localhost:3000/housing/`);
  }

  getHousingById(id: number) {
    return this.http.get(`http://localhost:3000/housing/${id}`);
  }

  getHousingBySearchParams(city: string, guests: number = 1, arrivalDate: string, departureDate: string) {
    if ((typeof(city) !== 'string')) {
      throw new Error('City is not a string');
    }
    // guests = Math.max(guests, 1);
    return this.http.get<Housing[]>(`http://localhost:3000/housing/`, {params: {'address.city': city}})
      .pipe(
        // filter((housings, i) => housings[i].address.city.toLowerCase() === city.toLowerCase()),

        // filter((housings, i) => {
        //   if ((housings && housings[i] && housings[i].hasOwnProperty('maxGuests'))) {
        //     return +housings[i].maxGuests >= guests;
        //   }
        //   return true;
        // })
      );
  }
}
