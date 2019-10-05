export class HousingRequest {
  constructor(
    public housingId: number,
    public arrivalDate: string,
    public arrivalTime: string,
    public departureDate: string,
    public departureTime: string,
    public guestsCount: number,
    public target: string,
    public comment: string,
    public payMethod: string,
    public cost: number,
    public user: string,
    public status?: string,
    public id?: number
  ) {}
}
