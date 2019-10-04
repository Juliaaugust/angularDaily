export class Review {
  constructor(
    public guestName?: string,
    public advantages?: string,
    public disadvantages?: string,
    public comment?: string,
    public date?: string,
    public stars?: number
  ){}
}
