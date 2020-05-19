import { Interval, DateTime } from "luxon";

export const timeOfDayDescription = (timeOfDay: Interval[]) => {
  const now = DateTime.local();

  console.log("NOW", now.toFormat("T"));
  if (timeOfDay.length < 2) {
    console.log("RANGE", timeOfDay[0].toFormat("T"));
    if (timeOfDay[0].contains(now)) {
      const timeLeft = Interval.fromDateTimes(now, timeOfDay[0].end);
      const hoursLeft = timeLeft.toDuration("hours").toFormat("h");
      const minutesLeft = timeLeft.toDuration("minutes").toFormat("mm");
      console.log("DURATION", timeOfDay[0].toDuration("hours").hours);
      if (timeOfDay[0].toDuration("hours").hours > 22) {
        return "Available all day";
      }

      if (minutesLeft && parseInt(minutesLeft) <= 30) {
        return `You've only got ${minutesLeft} minutes left to catch this one.`;
      } else if (hoursLeft && parseInt(hoursLeft) <= 2) {
        return `You've got a little while left to catch this one.`;
      } else if (hoursLeft && parseInt(hoursLeft) >= 3) {
        return "You've got plenty of time to catch this one.";
      }
    } else {
      const start = timeOfDay[0].start;
      return `You can catch this guy from ${start
        .toFormat("ha")
        .toLowerCase()} tomorrow.`;
    }
  }
};
