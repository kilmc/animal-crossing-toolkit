import { CritterType, CritterProps } from "../types";

export const foundThisTimeOfDay = (timeOfDayFound: number[]) => {
  return timeOfDayFound.includes(new Date(Date.now()).getHours());
};

export const foundThisTimeOfYear = (timeOfYearFound: number[]) => {
  return timeOfYearFound.includes(new Date(Date.now()).getMonth());
};

export const getCritterImageUrl = (
  critterName: string,
  index: number,
  critterType: CritterType
) => {
  const publicDir = process.env.PUBLIC_URL;
  console.log("publicDir", publicDir);
  const subDir = `critters/${critterType}/`;
  const name = critterName.replace(/\s/g, "-").replace(/'/g, "").toLowerCase();

  return `${publicDir}${subDir}${index}-${name}.png`;
};

export const isCritterActive = (critter: CritterProps) =>
  foundThisTimeOfDay(critter.timeOfDayFound) &&
  foundThisTimeOfYear(critter.timeOfYearFound);
