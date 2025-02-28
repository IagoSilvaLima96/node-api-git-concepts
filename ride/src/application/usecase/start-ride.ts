import { RideRepository } from "../repositoy/ride.repository";

export class StartRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.start(input.date);
    await this.rideRepository.update(ride);
  }
}

type Input = {
  rideId: string;
  date: Date;
};
