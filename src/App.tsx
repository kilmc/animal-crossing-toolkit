import React, { useState } from "react";
import GoogleSheetsProvider, { withGoogleSheets } from "react-db-google-sheets";
import { cleanTimeOfYear } from "./cleaning/cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaning/cleaningTimeOfDay";
import { CritterInputProps, CritterType } from "./types";
import { CritterList } from "./critters/CritterList";

interface BugsSheetMapperProps {
  db: {
    critters: CritterInputProps[];
  };
}

const BugsListMapper = (data: BugsSheetMapperProps) => {
  const critters = data.db.critters;
  const cleanedAndFilteredBugs = critters.map((critter) => ({
    ...critter,
    timeOfYearFound: cleanTimeOfYear(critter.timeOfYearFoundNorth),
    timeOfDayFound: cleanTimeOfDay(critter.timeOfDayFound),
    bells: parseInt(critter.bells.replace(",", "")),
    index: parseInt(critter.id),
    critterType: critter.critterType.toLowerCase() as CritterType,
  }));

  return <CritterList critters={cleanedAndFilteredBugs} />;
};

const BugsList = withGoogleSheets("critters")(BugsListMapper);
const initialFilterState = {
  hideInactive: true,
};

export const FilterContext = React.createContext(initialFilterState);

function App() {
  const [hideInactive, setHideInactive] = useState(true);

  return (
    <FilterContext.Provider
      value={{
        hideInactive,
      }}
    >
      <GoogleSheetsProvider>
        <main className="bg-red-300">
          <header className="flex p2x bg-brown-900 text-cream-200">
            <h1 className="fz20px">ACNH Toolkit</h1>
            <button
              className="ml-auto"
              onClick={() => setHideInactive(!hideInactive)}
            >
              {hideInactive ? "Show Inactive" : "Hide Inactive"}
            </button>
          </header>
          <div className="p3x">
            <BugsList />
          </div>
        </main>
      </GoogleSheetsProvider>
    </FilterContext.Provider>
  );
}

export default App;
