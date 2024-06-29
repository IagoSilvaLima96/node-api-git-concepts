import Ride from "../../domain/ride/ride";

export interface RideRepository {
  save(ride: Ride): Promise<void>;
  get(rideId: string): Promise<Ride>;
  update(ride: Ride): Promise<void>;
}
