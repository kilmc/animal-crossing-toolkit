import { Interval } from "luxon";

export type CritterType = "bug" | "fish";
export type Hemisphere = "northern" | "southern";

export interface CritterProps {
  bells: number;
  critterType: CritterType;
  imageUrl: string;
  index: number;
  timeOfDayFound: Interval[];
  timeOfYearFound: Interval[];
  timeOfYearFoundOpposite: Interval[];
  name: string;
  whereFound: string;
  critterId: string;
}

export interface CritterInputProps {
  bells: string;
  critterType: CritterType;
  id: string;
  imageUrl: string;
  name: string;
  timeOfDayFound: string;
  timeOfYearFoundNorth: string;
  timeOfYearFoundSouth: string;
  whereFound: string;
}
