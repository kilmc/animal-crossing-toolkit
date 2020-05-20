import { cleanTimeOfYear } from "./cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaningTimeOfDay";

Date.now = jest.fn(() => new Date(Date.UTC(2020, 5, 15)).valueOf());

const testTimeOfYear = (
  inputTimeOfYear: string | undefined,
  outputTime: string[]
) =>
  expect(
    cleanTimeOfYear(inputTimeOfYear).map((timeOfYear) =>
      timeOfYear.toFormat("MMMM", { separator: " - " })
    )
  ).toEqual(outputTime);

describe("cleanTimeOfYear", () => {
  it('Handles "Year-round" case', () => {
    testTimeOfYear("Year-round", ["January - December"]);
  });

  it("Handles single month case", () => {
    testTimeOfYear("July", ["July - July"]);
  });

  it("Handles single range case", () => {
    testTimeOfYear("April-September", ["April - September"]);
  });

  it("Handles multi range case", () => {
    testTimeOfYear("May-June, September-November", [
      "May - June",
      "September - November",
    ]);
  });

  it("Handles ranges that cross the year line", () => {
    testTimeOfYear("November-February", [
      "January - February",
      "November - December",
    ]);
  });
});

const testTime = (inputTime: string | undefined, outputTime: string[]) =>
  expect(
    cleanTimeOfDay(inputTime).map((time) =>
      time.toFormat("D T", { separator: " - " })
    )
  ).toEqual(outputTime);

describe("cleanTimeOfDay", () => {
  it("Handles 'All day' case", () => {
    testTime("All day", ["6/14/2020 00:00 - 6/14/2020 23:59"]);
  });

  it("Handles a single range case", () => {
    testTime("4am - 7pm", ["6/14/2020 04:00 - 6/14/2020 19:00"]);
  });

  it("Handles a multi range case", () => {
    testTime("4am - 8am, 4pm - 7pm", [
      "6/14/2020 04:00 - 6/14/2020 08:00",
      "6/14/2020 16:00 - 6/14/2020 19:00",
    ]);
  });

  it("Handles a range that crosses the day line", () => {
    testTime("11pm - 8am", ["6/14/2020 23:00 - 6/15/2020 08:00"]);
  });

  it("Handles undefined and empty string", () => {
    testTime(undefined, ["6/14/2020 00:00 - 6/14/2020 23:59"]);
    testTime("", ["6/14/2020 00:00 - 6/14/2020 23:59"]);
  });
});
