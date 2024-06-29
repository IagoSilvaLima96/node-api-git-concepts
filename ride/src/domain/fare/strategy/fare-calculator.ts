import Segment from "../../ride/segment";

export interface FareCalculator {
  calculate(segment: Segment): number;
}
