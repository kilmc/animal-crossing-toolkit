export type CritterType = "bug" | "fish";

export interface CritterProps {
  bells: number;
  critterType: CritterType;
  imageUrl: string;
  index: number;
  timeOfDayFound: number[];
  timeOfYearFound: number[];
  name: string;
  whereFound: string;
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
