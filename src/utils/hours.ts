import { HOURS } from "../constants";

export const amPmTo24Hour = (time: string) => {
  const [, hour, amPmDesignator] = time.toLowerCase().match(/(\d+)(am|pm)/);
  return amPmDesignator === "am" ? parseInt(hour) : parseInt(hour) + 12;
};

export const generateHourRange = (startHour: number, endHour: number) => {
  if (endHour < startHour) {
    return HOURS.slice(startHour, HOURS.length + 1)
      .concat(HOURS.slice(0, endHour + 1))
      .sort((a, b) => a - b);
  } else {
    return HOURS.slice(startHour, endHour + 1).sort((a, b) => a - b);
  }
};
