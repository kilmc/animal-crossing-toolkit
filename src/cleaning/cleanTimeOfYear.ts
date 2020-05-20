import { monthNameToNumber } from "../utils/months";
import { DateTime, Interval } from "luxon";

export const cleanTimeOfYear = (timeOfYear: string | undefined) => {
  const now = DateTime.local().set({
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const yearRound = Interval.fromDateTimes(
    now.startOf("year"),
    now.endOf("year")
  );

  if (!timeOfYear || timeOfYear.length < 1 || timeOfYear === "Year-round") {
    return [yearRound];
  }
  return timeOfYear
    .split(", ")
    .map((range) => range.split("-"))
    .flatMap((ranges) => {
      const [startMonth, endMonth] = ranges.map(monthNameToNumber);

      if (ranges.length < 2) {
        const month = now.set({ month: startMonth });
        return Interval.fromDateTimes(
          month.startOf("month"),
          month.endOf("month")
        );
      } else if (endMonth < startMonth) {
        const startOfYear = now.startOf("year");
        const endOfYear = now.endOf("year");

        const startInterval = Interval.fromDateTimes(
          startOfYear,
          now.set({ month: endMonth }).endOf("month")
        );
        const endInterval = Interval.fromDateTimes(
          now.set({ month: startMonth }).startOf("month"),
          endOfYear
        );
        return [startInterval, endInterval];
      } else {
        return Interval.fromDateTimes(
          now.set({ month: startMonth }).startOf("month"),
          now.set({ month: endMonth }).endOf("month")
        );
      }
    });
};
