import Ride from "../ride";

export abstract class RideStatus {
  abstract value: string;
  constructor(readonly ride: Ride) {}

  abstract request(): void;
  abstract accept(): void;
  abstract start(): void;
  abstract end(): void;
}
