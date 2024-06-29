import Ride from "../ride";
import { AcceptedRideStatus } from "./accepted-ride-status";
import { CompletedRideStatus } from "./completed-ride-status";
import { RequestedRideStatus } from "./requested-ride-status";
import { RideStatus } from "./ride-status";
import { StartedRideStatus } from "./started-ride-status";

export class RideStatusFactory {
  static create(status: string, ride: Ride): RideStatus {
    if (status === "requested") {
      return new RequestedRideStatus(ride);
    }
    if (status === "accepted") {
      return new AcceptedRideStatus(ride);
    }
    if (status === "in_progress") {
      return new StartedRideStatus(ride);
    }
    if (status === "completed") {
      return new CompletedRideStatus(ride);
    }
    throw new Error("Invalid Status");
  }
}
