import { amPmTo24Hour } from "../utils/hours";
import { DateTime, Interval } from "luxon";

export const cleanTimeOfDay = (timeOfDay: string | undefined) => {
  const now = DateTime.local().set({
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const allDay = Interval.fromDateTimes(now.startOf("day"), now.endOf("day"));
  if (!timeOfDay || timeOfDay.length < 1) {
    return [allDay];
  }

  return timeOfDay
    .split(", ")
    .map((range) => range.split("-"))
    .map((ranges) => {
      if (ranges.length < 2 && ranges[0].toLowerCase() === "all day") {
        return allDay;
      }

      const [startHour, endHour] = ranges.map(amPmTo24Hour);

      if (startHour > endHour) {
        return Interval.fromDateTimes(
          now.set({ hour: startHour }),
          now.set({ hour: endHour }).plus({ day: 1 })
        );
      } else {
        return Interval.fromDateTimes(
          now.set({ hour: startHour }),
          now.set({ hour: endHour })
        );
      }
    }, []);
};
