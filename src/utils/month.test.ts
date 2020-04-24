import { monthNameRangeToNumbers } from "./months";

describe("months", () => {
  it("Handles ranges that DO NOT cross the year line", () => {
    expect(monthNameRangeToNumbers("january", "may")).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
    ]);
  });

  it("Handles ranges that cross the year line", () => {
    expect(monthNameRangeToNumbers("october", "february")).toStrictEqual([
      9,
      10,
      11,
      0,
      1,
    ]);
  });

  it("Handles month names in different cases", () => {
    expect(monthNameRangeToNumbers("OCTOBER", "dEcEmBeR")).toStrictEqual([
      9,
      10,
      11,
    ]);
  });
});
