import Ride from "../ride";
import { AcceptedRideStatus } from "./accepted-ride-status";
import { RideStatus } from "./ride-status";

export class RequestedRideStatus extends RideStatus {
  value: string;
  constructor(ride: Ride) {
    super(ride);
    this.value = "requested";
  }

  request(): void {
    throw new Error("Invalid Status");
  }

  accept(): void {
    this.ride.status = new AcceptedRideStatus(this.ride);
  }

  start(): void {
    throw new Error("Invalid Status");
  }

  end(): void {
    throw new Error("Invalid Status");
  }
}
