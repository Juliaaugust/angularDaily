import { Reservation } from './reservation.model';
import { Vacancy } from './vacancy.model';
import { HousingRequest } from './housing-reguest.model';
export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public role?: string,
    public registrDate?: string,
    public id?: number,
    public gender?: string,
    public country?: string,
    public city?: string,
    public tel?: string,
    public reservations?: Reservation[],
    public vacancies?: Vacancy[],
    public landlordVacancies?: Vacancy[],
    public reguests?: HousingRequest[]
  ) { }
}
