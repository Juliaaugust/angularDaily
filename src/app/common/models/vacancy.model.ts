export class Vacancy {
  constructor(
    public housingId: number,
    public status: string,
    public landlordId?: number,
    public id?: number,
  ){}

}
