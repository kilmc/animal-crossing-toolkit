import { cleanTimeOfYear } from "./cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaningTimeOfDay";

describe("cleanTimeOfYear", () => {
  it('Handles "Year-round" case', () => {
    expect(cleanTimeOfYear("Year-round")).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
    ]);
  });

  it("Handles single month case", () => {
    expect(cleanTimeOfYear("July")).toStrictEqual([6]);
  });

  it("Handles single range case", () => {
    expect(cleanTimeOfYear("April-September")).toStrictEqual([
      3,
      4,
      5,
      6,
      7,
      8,
    ]);
  });

  it("Handles multi range case", () => {
    expect(cleanTimeOfYear("May-June, September-November")).toStrictEqual([
      4,
      5,
      8,
      9,
      10,
    ]);
  });

  it("Handles ranges that cross the year line", () => {
    expect(cleanTimeOfYear("November-February")).toStrictEqual([0, 1, 10, 11]);
  });
});

describe("cleanTimeOfDay", () => {
  it("Handles 'All day' case", () => {
    expect(cleanTimeOfDay("All day")).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ]);
  });

  it("Handles a single range case", () => {
    expect(cleanTimeOfDay("4am - 7pm")).toStrictEqual([
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
    ]);
  });

  it("Handles a multi range case", () => {
    expect(cleanTimeOfDay("4am - 8am, 4pm - 7pm")).toStrictEqual([
      4,
      5,
      6,
      7,
      8,
      16,
      17,
      18,
      19,
    ]);
  });

  it("Handles a range that crosses the day line", () => {
    expect(cleanTimeOfDay("11pm - 8am")).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      23,
    ]);
  });

  it("Handles undefined and empty string", () => {
    expect(cleanTimeOfDay(undefined)).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ]);

    expect(cleanTimeOfDay("")).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ]);
  });
});
