import { monthNameRangeToNumbers } from "./months";

describe("months", () => {
  it("Handles ranges that DO NOT cross the year line", () => {
    expect(monthNameRangeToNumbers("january", "may")).toStrictEqual([
      1,
      2,
      3,
      4,
      5,
    ]);
  });

  fit("Handles ranges that cross the year line", () => {
    expect(monthNameRangeToNumbers("october", "february")).toStrictEqual([
      10,
      11,
      12,
      1,
      2,
    ]);
  });

  it("Handles month names in different cases", () => {
    expect(monthNameRangeToNumbers("OCTOBER", "dEcEmBeR")).toStrictEqual([
      10,
      11,
      12,
    ]);
  });
});
