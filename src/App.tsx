import React, { useContext } from "react";
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
  const { hemisphere } = useContext(FilterContext).state;
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
  settingsOpen: boolean;
  showInactive: boolean;
  showDonated: boolean;
  hemisphere: Hemisphere;
  critterType: CritterType | "both";
  donations: string[];
}
const initialState: stateProps = {
  settingsOpen: false,
  showDonated: false,
  showInactive: false,
  hemisphere: "northern",
  critterType: "bug",
  donations: [],
};

export const FilterContext = React.createContext({
  state: initialState,
  setState: (newState: stateProps) => {},
});

function App() {
  const [state, setState] = useLocalStorageState(
    initialState,
    "animal-crossing"
  );

  const setSettingsVisibility = (settingsOpen: boolean) =>
    setState({ ...state, settingsOpen });
  const setShowDonated = (showDonated: boolean) =>
    setState({ ...state, showDonated });
  const setShowInactive = (showInactive: boolean) =>
    setState({ ...state, showInactive });
  const setHemisphere = (hemisphere: Hemisphere) =>
    setState({ ...state, hemisphere });
  const setCritter = (critterType: CritterType | "both") =>
    setState({ ...state, critterType });

  const donatedBugsCount = state.donations.filter((critter) =>
    critter.match("bug")
  ).length;

  const donatedFishCount = state.donations.filter((critter) =>
    critter.match("fish")
  ).length;

  return (
    <FilterContext.Provider value={{ state, setState }}>
      <GoogleSheetsProvider>
        <div>
          <div className="bg-yellow-300 layout-main">
            <header className="sticky t0 z1 px3x flex h8x bg-brown-900 text-cream-200 items-center">
              <nav className="self-end">
                <button className="bg-cream-200 text-brown-800 radius-top1x text-bold p1x fz16px">
                  Critter Helper
                </button>
              </nav>
              <h1 className="fz20px ml-auto">ACNH Toolkit</h1>
            </header>
            <div className="layout-body">
              <div>
                <CritterAppSettings
                  settingsOpen={state.settingsOpen}
                  setSettingsVisibility={setSettingsVisibility}
                  showDonated={state.showDonated}
                  setShowDonated={setShowDonated}
                  showInactive={state.showInactive}
                  setShowInactive={setShowInactive}
                  hemisphere={state.hemisphere}
                  setHemisphere={setHemisphere}
                  critterType={state.critterType}
                  setCritter={setCritter}
                  donationsCount={{
                    bugs: donatedBugsCount,
                    fish: donatedFishCount,
                  }}
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
