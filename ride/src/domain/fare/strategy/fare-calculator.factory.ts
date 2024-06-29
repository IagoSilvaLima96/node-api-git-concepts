import { FareCalculator } from "./fare-calculator";
import { NormalFareCaculator } from "./normal-fare-calculator";
import { OvernightFareCaculator } from "./overnight-fare-calculator";
import Segment from "../../ride/segment";
import { SundayFareCaculator } from "./sunday-fare-calculator";
import { SundayOvernightFareCaculator } from "./sunday-overnight-fare-calculator";

export class FareCalculatorFactory {
  static create(segment: Segment): FareCalculator {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCaculator();
    }
    if (segment.isOvernight() && segment.isSunday()) {
      return new SundayOvernightFareCaculator();
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCaculator();
    }
    return new NormalFareCaculator();
  }
}
