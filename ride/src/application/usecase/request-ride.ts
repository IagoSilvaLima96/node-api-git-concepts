import { Coord } from "../../domain/distance/coord";
import Ride from "../../domain/ride/ride";
import { RideRepository } from "../repositoy/ride.repository";

export default class RequestRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const from = new Coord(input.from.lat, input.from.lng);
    const to = new Coord(input.to.lat, input.to.lng);
    const ride = Ride.create(input.passengerId, from, to, input.date);
    await this.rideRepository.save(ride);
    return {
      rideId: ride.rideId,
    };
  }
}

type Input = {
  passengerId: string;
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
  date: Date;
};

type Output = {
  rideId: string;
};
