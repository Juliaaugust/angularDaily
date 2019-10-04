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
    public type?: string,
    public description?: string,
    // public pets?: boolean,
    public id?: number,
    public rating?: number,
    public isVisible?: boolean,
    public landlordId?: number
  ) {}
}
