import React, { useContext } from "react";
import { CritterProps } from "../types";
import { isCritterActive } from "./utils";
import { CritterCard } from "./CritterCard";
import { FilterContext } from "../App";

interface Props {
  critters: CritterProps[];
}

export const CritterList = (props: Props) => {
  const { hideInactive } = useContext(FilterContext);
  const filterInactive = hideInactive
    ? isCritterActive
    : (x: CritterProps) => x;

  return (
    <ul className="critter-list-layout">
      {props.critters.filter(filterInactive).map((critter, i) => {
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
              index={critter.index}
              activeNow={isCritterActive(critter)}
            />
          </li>
        );
      })}
    </ul>
  );
};
