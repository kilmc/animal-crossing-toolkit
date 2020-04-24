import { MONTHS } from "../constants";
import { monthNameToNumber, monthNameRangeToNumbers } from "../utils/months";

export const cleanTimeOfYear = (timeOfYear: string): number[] => {
  if (timeOfYear === "Year-round") {
    return MONTHS.map(monthNameToNumber);
  }

  return timeOfYear
    .split(", ")
    .map((range) => range.split("-"))
    .reduce((accum, ranges) => {
      if (ranges.length < 2) {
        return accum.concat(monthNameToNumber(ranges[0]));
      }

      return accum.concat(monthNameRangeToNumbers(ranges[0], ranges[1]));
    }, [] as number[]);
};
