import segment from "../../ride/segment";
import { FareCalculatorHandler } from "./fare-calculator.handler";

export class NormalFareCalculatorHandler extends FareCalculatorHandler {
  TAX_FARE = 2.1;
  calculate(segment: segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return this.TAX_FARE * segment.distance;
    }
    if (!this.next) {
      throw new Error("end of chain");
    }
    return this.next?.calculate(segment);
  }
}
