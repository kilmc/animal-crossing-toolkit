import React, { useState, useContext } from "react";
import GoogleSheetsProvider, { withGoogleSheets } from "react-db-google-sheets";
import { cleanTimeOfYear } from "./cleaning/cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaning/cleaningTimeOfDay";
import { CritterInputProps, CritterType, Hemisphere } from "./types";
import { CritterList } from "./critters/CritterList";
import { CritterAppSettings } from "./critters/CritterSettings";

interface BugsSheetMapperProps {
  db: {
    critters: CritterInputProps[];
  };
}

const BugsListMapper = (data: BugsSheetMapperProps) => {
  const { hemisphere } = useContext(FilterContext);
  const currentHemisphere =
    hemisphere === "northern" ? "timeOfYearFoundNorth" : "timeOfYearFoundSouth";
  const critters = data.db.critters;
  const cleanedAndFilteredBugs = critters.map((critter) => ({
    ...critter,
    timeOfYearFound: cleanTimeOfYear(critter[currentHemisphere]),
    timeOfDayFound: cleanTimeOfDay(critter.timeOfDayFound),
    bells: parseInt(critter.bells.replace(",", "")),
    index: parseInt(critter.id),
    critterType: critter.critterType.toLowerCase() as CritterType,
    critterId: `${critter.critterType}-${critter.id}`.toLowerCase(),
  }));

  return <CritterList critters={cleanedAndFilteredBugs} />;
};

const BugsList = withGoogleSheets("critters")(BugsListMapper);

interface FilterStateProps {
  showInactive: boolean;
  showDonated: boolean;
  hemisphere: Hemisphere;
  critterType: CritterType | "both";
}
const initialFilterState: FilterStateProps = {
  showDonated: false,
  showInactive: false,
  hemisphere: "northern",
  critterType: "bug",
};

export const FilterContext = React.createContext(initialFilterState);

function App() {
  const [showInactive, setShowInactive] = useState<boolean>(
    initialFilterState.showInactive
  );

  const [showDonated, setShowDonated] = useState<boolean>(
    initialFilterState.showDonated
  );
  const [hemisphere, setHemisphere] = useState<Hemisphere>(
    initialFilterState.hemisphere
  );

  const [critterType, setCritter] = useState<"bug" | "fish" | "both">(
    initialFilterState.critterType
  );

  return (
    <FilterContext.Provider
      value={{
        showDonated,
        showInactive,
        hemisphere,
        critterType,
      }}
    >
      <GoogleSheetsProvider>
        <div>
          <div className="bg-yellow-300 layout-main">
            <header className="sticky t0 z1 px3x flex h8x bg-brown-900 text-cream-200 items-center">
              <nav className="self-end">
                <button className="bg-cream-200 text-brown-800 radius-top1x text-bold p1x">
                  Critter Helper
                </button>
              </nav>
              <h1 className="fz20px ml-auto">ACNH Toolkit</h1>
            </header>
            <div className="layout-body">
              <div>
                <CritterAppSettings
                  showDonated={showDonated}
                  setShowDonated={setShowDonated}
                  showInactive={showInactive}
                  setShowInactive={setShowInactive}
                  hemisphere={hemisphere}
                  setHemisphere={setHemisphere}
                  critterType={critterType}
                  setCritter={setCritter}
                />
              </div>
              <BugsList />
            </div>
          </div>
        </div>
      </GoogleSheetsProvider>
    </FilterContext.Provider>
  );
}

export default App;
