export class Reservation {
  constructor(
    public housingId: number,
    public status: string,
    public dates: string,
    public id?: number
  ) {}
}
