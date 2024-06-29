import segment from "../../ride/segment";
import { FareCalculatorHandler } from "./fare-calculator.handler";

export class SundayFareCalculatorHandler extends FareCalculatorHandler {
  TAX_FARE = 2.9;
  calculate(segment: segment): number {
    if (!segment.isOvernight() && segment.isSunday()) {
      return this.TAX_FARE * segment.distance;
    }
    if (!this.next) {
      throw new Error("end of chain");
    }
    return this.next?.calculate(segment);
  }
}
