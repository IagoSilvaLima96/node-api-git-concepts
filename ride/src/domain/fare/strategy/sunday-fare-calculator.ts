import { FareCalculator } from "./fare-calculator";
import Segment from "../../ride/segment";

export class SundayFareCaculator implements FareCalculator {
  TAX_FARE = 2.9;
  calculate(segment: Segment): number {
    return this.TAX_FARE * segment.distance;
  }
}
