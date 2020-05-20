import { CritterType, CritterProps } from "../types";
import { Interval, DateTime } from "luxon";

export const foundThisTimeOfDay = (timeOfDayFound: Interval[]) => {
  return timeOfDayFound.some((time) => time.contains(DateTime.local()));
};

export const foundThisTimeOfYear = (timeOfYearFound: Interval[]) => {
  return timeOfYearFound.some((time) => time.contains(DateTime.local()));
};

export const getCritterImageUrl = (
  critterName: string,
  index: number,
  critterType: CritterType
) => {
  const publicDir = process.env.PUBLIC_URL;
  const subDir = `critters/${critterType}/`;
  const name = critterName.replace(/\s/g, "-").replace(/'/g, "").toLowerCase();

  return `${publicDir}${subDir}${index}-${name}.png`;
};

export const isCritterActive = (critter: CritterProps) =>
  foundThisTimeOfDay(critter.timeOfDayFound) &&
  foundThisTimeOfYear(critter.timeOfYearFound);
