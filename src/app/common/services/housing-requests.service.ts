import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HousingRequest } from '../models/housing-reguest.model';

Injectable();
export class HousingRequestsService {

  constructor(private http: HttpClient) {}

  createNewRequest(housingReq: HousingRequest) {
    // return this.http.post('http://localhost:3000/housing', housingReq);
  }
}
