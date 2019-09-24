import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Housing } from '../models/housing.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HousingService {

  constructor(private http: HttpClient) { }

  getHousings() {
    return this.http.get<Housing[]>(`http://localhost:3000/housing/`);
  }

  getHousingById(id: number) {
    return this.http.get(`http://localhost:3000/housing/${id}`);
  }
}
