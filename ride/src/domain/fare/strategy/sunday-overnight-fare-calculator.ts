import { FareCalculator } from "./fare-calculator";
import Segment from "../../ride/segment";

export class SundayOvernightFareCaculator implements FareCalculator {
  TAX_FARE = 5;
  calculate(segment: Segment): number {
    return this.TAX_FARE * segment.distance;
  }
}
