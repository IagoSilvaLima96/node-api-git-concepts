import Ride from "../ride";
import { CompletedRideStatus } from "./completed-ride-status";
import { RideStatus } from "./ride-status";

export class StartedRideStatus extends RideStatus {
  value: string;
  constructor(readonly ride: Ride) {
    super(ride);
    this.value = "in_progress";
  }

  request(): void {
    throw new Error("Invalid Status");
  }

  accept(): void {
    throw new Error("Invalid Status");
  }

  start(): void {
    throw new Error("Invalid Status");
  }

  end(): void {
    this.ride.status = new CompletedRideStatus(this.ride);
  }
}
