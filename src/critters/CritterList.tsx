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

export const CritterList = (props: Props) => {
  const { state, setState } = useContext(FilterContext);
  const {
    showInactive,
    critterType,
    showDonated,
    donations,
    hemisphere,
  } = state;
  const filterInactive = showInactive
    ? (x: CritterProps) => x
    : isCritterActive;

  return (
    <ul className="layout-critter-list">
      {props.critters
        .filter(filterInactive)
        .filter((critter) => filterByCritterType(critter, critterType))
        .filter((critter) =>
          showDonated ? true : !(donations.indexOf(critter.critterId) !== -1)
        )
        .map((critter, i) => {
          return (
            <li key={`critter-${i}`}>
              <CritterCard
                key={`${i}-${showInactive}-${hemisphere}-${showDonated}-${critterType}`}
                donations={donations}
                setDonations={(arr: string[]) =>
                  setState({ ...state, donations: arr })
                }
                timeOfDayFound={critter.timeOfDayFound}
                timeOfYearFound={critter.timeOfYearFound}
                timeOfYearFoundOpposite={critter.timeOfYearFoundOpposite}
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
