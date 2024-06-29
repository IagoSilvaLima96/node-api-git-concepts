import { Coord } from "../../domain/distance/coord";
import Ride from "../../domain/ride/ride";

export default class CalculateRide {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
    for (const position of input.positions) {
      ride.addPosition(position.lat, position.lng, new Date(position.date));
    }
    const price = ride.calculate();
    return {
      price,
    };
  }
}

type Input = {
  positions: { lat: number; lng: number; date: Date }[];
};

type Output = {
  price: number;
};
