import { amPmTo24Hour, generateHourRange } from "../utils/hours";
import { HOURS } from "../constants";

export const cleanTimeOfDay = (timeOfDay: string | undefined) => {
  if (!timeOfDay || timeOfDay.length < 1) {
    return HOURS;
  }

  return timeOfDay
    .split(", ")
    .map((range) => range.split("-"))
    .reduce((accum, ranges) => {
      if (ranges.length < 2 && ranges[0].toLowerCase() === "all day") {
        return accum.concat(HOURS);
      }

      const [startHour, endHour] = ranges.map(amPmTo24Hour);

      return accum.concat(generateHourRange(startHour, endHour));
    }, [] as number[]);
};
