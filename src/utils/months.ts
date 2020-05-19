import { MONTHS } from "../constants";

export const monthNameToNumber = (monthName: string) =>
  MONTHS.indexOf(monthName.toLowerCase()) + 1;

export const monthNameRangeToNumbers = (
  startMonthName: string,
  endMonthName: string
) => {
  const startMonth = monthNameToNumber(startMonthName);
  const endMonth = monthNameToNumber(endMonthName);

  if (endMonth < startMonth) {
    return MONTHS.slice(startMonth - 1, MONTHS.length + 1)
      .concat(MONTHS.slice(0, endMonth))
      .map(monthNameToNumber);
  } else {
    return MONTHS.slice(startMonth + 1, endMonth)
      .map(monthNameToNumber)
      .sort((a, b) => a - b);
  }
};
