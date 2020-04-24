import { MONTHS } from "../constants";

export const monthNameToNumber = (monthName: string) =>
  MONTHS.indexOf(monthName.toLowerCase());

export const monthNameRangeToNumbers = (
  startMonthName: string,
  endMonthName: string
) => {
  const startMonth = monthNameToNumber(startMonthName);
  const endMonth = monthNameToNumber(endMonthName);

  if (endMonth < startMonth) {
    return MONTHS.slice(startMonth, MONTHS.length + 1)
      .concat(MONTHS.slice(0, endMonth + 1))
      .map(monthNameToNumber)
      .sort((a, b) => a - b);
  } else {
    return MONTHS.slice(startMonth, endMonth + 1)
      .map(monthNameToNumber)
      .sort((a, b) => a - b);
  }
};
