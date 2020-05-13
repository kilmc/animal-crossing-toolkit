import React, { useState, useContext } from "react";
import GoogleSheetsProvider, { withGoogleSheets } from "react-db-google-sheets";
import { cleanTimeOfYear } from "./cleaning/cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaning/cleaningTimeOfDay";
import { CritterInputProps, CritterType, Hemisphere } from "./types";
import { CritterList } from "./critters/CritterList";
import { CritterAppSettings } from "./critters/CritterSettings";
import { useLocalStorageState } from "./utils/useLocalStorageState";

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

interface stateProps {
  showInactive: boolean;
  showDonated: boolean;
  hemisphere: Hemisphere;
  critterType: CritterType | "both";
}
const initialState: stateProps = {
  showDonated: false,
  showInactive: false,
  hemisphere: "northern",
  critterType: "bug",
};

export const FilterContext = React.createContext(initialState);

function App() {
  const [state, setState] = useLocalStorageState(
    initialState,
    "animal-crossing"
  );
  console.log("OUTER STATE", state);
  const setShowDonated = (showDonated: boolean) =>
    setState({ ...state, showDonated });
  const setShowInactive = (showInactive: boolean) =>
    setState({ ...state, showInactive });
  const setHemisphere = (hemisphere: Hemisphere) =>
    setState({ ...state, hemisphere });
  const setCritter = (critterType: CritterType | "both") =>
    setState({ ...state, critterType });

  return (
    <FilterContext.Provider
      value={{
        showDonated: state.showDonated,
        showInactive: state.showInactive,
        hemisphere: state.hemisphere,
        critterType: state.critterType,
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
                  showDonated={state.showDonated}
                  setShowDonated={setShowDonated}
                  showInactive={state.showInactive}
                  setShowInactive={setShowInactive}
                  hemisphere={state.hemisphere}
                  setHemisphere={setHemisphere}
                  critterType={state.critterType}
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
