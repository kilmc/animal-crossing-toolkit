import React, { useContext } from "react";
import { CritterProps } from "../types";
import { isCritterActive } from "./utils";
import { CritterCard } from "./CritterCard";
import { FilterContext } from "../App";

interface Props {
  critters: CritterProps[];
}

const filterByCritterType = (
  critter: CritterProps,
  currentSelection: "bug" | "fish" | "both"
) => {
  if (currentSelection === "both") {
    return true;
  }

  return critter.critterType === currentSelection;
};

const filterDonated = (critter: CritterProps) => {
  const previouslyDonated =
    JSON.parse(localStorage.getItem("donated") || "[]").indexOf(
      critter.critterId
    ) !== -1;

  return previouslyDonated;
};

export const CritterList = (props: Props) => {
  const { showInactive, critterType, showDonated } = useContext(FilterContext);
  console.log("PROVIDER STATE", useContext(FilterContext));
  const filterInactive = showInactive
    ? (x: CritterProps) => x
    : isCritterActive;

  return (
    <ul className="layout-critter-list">
      {props.critters
        .filter(filterInactive)
        .filter((critter) => filterByCritterType(critter, critterType))
        .filter((critter) =>
          showDonated ? (x: CritterProps) => x : !filterDonated(critter)
        )
        .map((critter, i) => {
          return (
            <li key={`critter-${i}`}>
              <CritterCard
                timeOfDayFound={critter.timeOfDayFound}
                timeOfYearFound={critter.timeOfYearFound}
                name={critter.name}
                whereFound={critter.whereFound}
                bells={critter.bells}
                imageUrl={critter.imageUrl}
                critterType={critter.critterType}
                critterId={critter.critterId}
                index={critter.index}
                activeNow={isCritterActive(critter)}
              />
            </li>
          );
        })}
    </ul>
  );
};
