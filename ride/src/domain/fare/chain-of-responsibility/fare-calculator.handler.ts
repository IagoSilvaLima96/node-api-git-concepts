import Segment from "../../ride/segment";

export abstract class FareCalculatorHandler {
  constructor(protected readonly next?: FareCalculatorHandler) {}

  abstract calculate(segment: Segment): number;
}
