import { FareCalculator } from "./fare-calculator";
import Segment from "../../ride/segment";

export class OvernightFareCaculator implements FareCalculator {
  private TAX_FARE = 3.9;

  public calculate(segment: Segment): number {
    return this.TAX_FARE * segment.distance;
  }
}
