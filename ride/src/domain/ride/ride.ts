import { DistanceCalculator } from "../distance/distance-calculator";
import { FareCalculatorHandler } from "../fare/chain-of-responsibility/fare-calculator.handler";
import { NormalFareCalculatorHandler } from "../fare/chain-of-responsibility/normal-fare-calculator.handler";
import { OvernightFareCalculatorHandler } from "../fare/chain-of-responsibility/overnight-fare-calculator.handler";
import { SundayFareCalculatorHandler } from "../fare/chain-of-responsibility/sunday-fare-calculator.handler";
import { SundayOvernightFareCalculatorHandler } from "../fare/chain-of-responsibility/sunday-overnight-fare-calculator.handler";
import { FareCalculatorFactory } from "../fare/strategy/fare-calculator.factory";
import { Position } from "./position";
import Segment from "./segment";
import crypto from "crypto";
import { Coord } from "../distance/coord";
import { RideStatus } from "./status/ride-status";
import { RideStatusFactory } from "./status/ride-status.factory";

export default class Ride {
  positions: Position[];
  fareCalculatorHandler: FareCalculatorHandler;
  MIN_PRICE = 10;
  status: RideStatus;
  driverId?: string;
  acceptDate?: Date;
  startDate?: Date;
  endDate?: Date;

  constructor(
    readonly rideId: string,
    readonly passengerId: string,
    readonly from: Coord,
    readonly to: Coord,
    status: string,
    readonly requestDate: Date
  ) {
    this.positions = [];
    const sundayOvernightFareCalculatorHandler =
      new SundayOvernightFareCalculatorHandler();
    const sundayFareCalculatorHandler = new SundayFareCalculatorHandler(
      sundayOvernightFareCalculatorHandler
    );
    const overnightFareCalculatorHandler = new OvernightFareCalculatorHandler(
      sundayFareCalculatorHandler
    );
    this.fareCalculatorHandler = new NormalFareCalculatorHandler(
      overnightFareCalculatorHandler
    );
    this.status = RideStatusFactory.create(status, this);
  }

  addPosition(lat: number, lng: number, date: Date) {
    this.positions.push(new Position(lat, lng, date));
  }

  calculate() {
    let price = 0;
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1];
      if (!nextPosition) {
        break;
      }
      const distance = DistanceCalculator.calculate(
        position.coord,
        nextPosition.coord
      );
      const segment = new Segment(distance, nextPosition.date);
      // const fareCalculator = FareCalculatorFactory.create(segment);
      // price += fareCalculator.calculate(segment);
      price += this.fareCalculatorHandler.calculate(segment);
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : price;
  }

  accept(driverId: string, date: Date) {
    this.status.accept();
    this.acceptDate = date;
    this.driverId = driverId;
  }

  start(date: Date) {
    this.status.start();
    this.startDate = date;
  }

  end(date: Date) {
    this.status.end();
    this.endDate = date;
  }

  static create(
    passengerId: string,
    from: Coord,
    to: Coord,
    requestDate: Date = new Date()
  ) {
    const rideId = crypto.randomUUID();
    const status = "requested";
    return new Ride(rideId, passengerId, from, to, status, requestDate);
  }
}
