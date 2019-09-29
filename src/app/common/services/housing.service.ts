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

  getHousingBySearchParams(city: string, guests: number = 1) {
    return this.http.get(`http://localhost:3000/housing/`)
      .pipe(
        filter((housings, i) => housings[i].address.city.toLowerCase() === city.toLowerCase()),
        filter((housings, i) => housings[i].maxGuests >= guests),
        map((housings) => housings[0] ? housings : undefined)
      );
  }
}
