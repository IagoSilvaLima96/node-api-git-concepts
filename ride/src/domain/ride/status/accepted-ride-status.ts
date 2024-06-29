import Ride from "../ride";
import { RideStatus } from "./ride-status";
import { StartedRideStatus } from "./started-ride-status";

export class AcceptedRideStatus extends RideStatus {
  value: string;
  constructor(readonly ride: Ride) {
    super(ride);
    this.value = "accepted";
  }

  request(): void {
    throw new Error("Invalid Status");
  }

  accept(): void {
    throw new Error("Invalid Status");
  }

  start(): void {
    this.ride.status = new StartedRideStatus(this.ride);
  }

  end(): void {
    throw new Error("Invalid Status");
  }
}
