import Ride from "../ride";
import { RideStatus } from "./ride-status";

export class CompletedRideStatus extends RideStatus {
  value: string;
  constructor(readonly ride: Ride) {
    super(ride);
    this.value = "completed";
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
    throw new Error("Invalid Status");
  }
}
