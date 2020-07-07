import React, { useContext } from "react";
import GoogleSheetsProvider, { withGoogleSheets } from "react-db-google-sheets";
import { cleanTimeOfYear } from "./cleaning/cleanTimeOfYear";
import { cleanTimeOfDay } from "./cleaning/cleaningTimeOfDay";
import { CritterInputProps, CritterType, Hemisphere } from "./types";
import { CritterList } from "./critters/CritterList";
import { CritterAppSettings } from "./critters/CritterSettings";
import { useLocalStorageState } from "./utils/useLocalStorageState";

const sheetName =
  process.env.NODE_ENV === "production" ? "critters" : "critters-staging";

interface BugsSheetMapperProps {
  db: {
    critters: CritterInputProps[];
    "critters-staging": CritterInputProps[];
  };
}

const BugsListMapper = (data: BugsSheetMapperProps) => {
  const { hemisphere } = useContext(FilterContext).state;
  const critters = data.db[sheetName];
  const cleanedAndFilteredCritters = critters.map((critter) => {
    const currentHemisphere =
      hemisphere === "northern"
        ? "timeOfYearFoundNorth"
        : "timeOfYearFoundSouth";

    const oppositeHemisphere =
      hemisphere === "southern"
        ? "timeOfYearFoundNorth"
        : "timeOfYearFoundSouth";
    const critterType = critter.critterType
      .toLowerCase()
      .replace(/\s/, "-") as CritterType;
    return {
      ...critter,
      timeOfYearFound: cleanTimeOfYear(critter[currentHemisphere]),
      timeOfYearFoundOpposite: cleanTimeOfYear(critter[oppositeHemisphere]),
      timeOfDayFound: cleanTimeOfDay(critter.timeOfDayFound),
      bells: parseInt(critter.bells.replace(",", "")),
      index: parseInt(critter.id),
      critterType,
      critterId: `${critterType}-${critter.id}`.toLowerCase(),
    };
  });

  return <CritterList critters={cleanedAndFilteredCritters} />;
};

const BugsList = withGoogleSheets(sheetName)(BugsListMapper);

interface stateProps {
  settingsOpen: boolean;
  showInactive: boolean;
  showDonated: boolean;
  hemisphere: Hemisphere;
  critterType: CritterType | "all";
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
  const setCritter = (critterType: CritterType | "all") =>
    setState({ ...state, critterType });

  const donatedBugsCount = state.donations.filter((critter) =>
    critter.match("bug")
  ).length;

  const donatedFishCount = state.donations.filter((critter) =>
    critter.match("fish")
  ).length;

  const donatedSeaCreatureCount = state.donations.filter((critter) =>
    critter.match("sea-creature")
  ).length;

  return (
    <FilterContext.Provider value={{ state, setState }}>
      <GoogleSheetsProvider>
        <div className="bg-yellow-300 min-h100vh">
          <header className="layout-header sticky t0 z1">
            <nav className="px3x flex h8x bg-brown-900 text-cream-200 items-center">
              <button className="z2 self-end bg-cream-200 text-brown-800 radius-top1x text-bold p1x fz16px">
                Critter Helper
              </button>
              <h1 className="fz20px ml-auto">ACNH Toolkit</h1>
            </nav>

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
                seaCreatures: donatedSeaCreatureCount,
              }}
            />
          </header>

          <BugsList />

          <footer className="text-center p10vh text-brown-800">
            Made with love by{" "}
            <a className="text-brown-800" href="https://kilian.website">
              Kilian
            </a>
          </footer>
        </div>
      </GoogleSheetsProvider>
    </FilterContext.Provider>
  );
}

export default App;
