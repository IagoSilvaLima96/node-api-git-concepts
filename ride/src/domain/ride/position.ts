import { Coord } from "../distance/coord";

export class Position {
  readonly coord: Coord;

  constructor(
    private readonly lat: number,
    private readonly lng: number,
    readonly date: Date
  ) {
    this.coord = new Coord(lat, lng);
  }
}
