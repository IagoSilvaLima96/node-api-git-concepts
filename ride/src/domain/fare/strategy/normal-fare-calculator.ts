import { FareCalculator } from "./fare-calculator";
import Segment from "../../ride/segment";

export class NormalFareCaculator implements FareCalculator {
  TAX_FARE = 2.1;
  calculate(segment: Segment): number {
    return this.TAX_FARE * segment.distance;
  }
}
