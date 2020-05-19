import { timeOfDayDescription } from "./timeOfDayDescription";
import { cleanTimeOfDay } from "../cleaning/cleaningTimeOfDay";

describe("timeOfDayDescription", () => {
  describe("when a critter is active", () => {
    describe("when there are more than 3 hours left", () => {
      it("returns the correct string", () => {
        Date.now = jest.fn(() =>
          new Date(Date.UTC(2020, 4, 15, 19, 0)).valueOf()
        );
        const interval = cleanTimeOfDay("4am - 7pm");

        expect(timeOfDayDescription(interval)).toBe(
          "You've got plenty of time to catch this one."
        );
      });
    });

    describe("and there are less than 2 hours left", () => {
      it("returns the correct string", () => {
        Date.now = jest.fn(() =>
          new Date(Date.UTC(2020, 4, 15, 20, 0)).valueOf()
        );
        const interval = cleanTimeOfDay("1pm - 6pm");

        expect(timeOfDayDescription(interval)).toBe(
          "You've got a little while left to catch this one."
        );
      });
    });

    describe("and there are less than 30 minutes left", () => {
      it("returns the correct string", () => {
        Date.now = jest.fn(() =>
          new Date(Date.UTC(2020, 4, 15, 21, 35)).valueOf()
        );
        const interval = cleanTimeOfDay("1pm - 6pm");

        expect(timeOfDayDescription(interval)).toBe(
          "You've only got 25 minutes left to catch this one."
        );
      });
    });
  });

  describe("when a critter is NOT active", () => {
    describe("and the critter won't be available until the next day", () => {
      it("returns the correct string", () => {
        Date.now = jest.fn(() =>
          new Date(Date.UTC(2020, 4, 16, 0, 0)).valueOf()
        );
        const interval = cleanTimeOfDay("4am - 7pm");

        expect(timeOfDayDescription(interval)).toBe(
          "You can catch this guy from 4am tomorrow."
        );
      });
    });
  });
});
