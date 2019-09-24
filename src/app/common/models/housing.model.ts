export class Housing {
  constructor(
    public name: string,
    public price: number,
    public address: {
      country: string,
      city: string,
      street: string,
      house: number,
    },
    public maxGuests: string,
    public description?: [],
    public id?: number,
  ) {}
}
