import React, { useState } from "react";
import { Hemisphere, CritterType } from "../types";
import { cxs } from "../utils/className";
import settingsIcon from "../assets/settings.png";
import donatedHidden from "../assets/donated-hidden.png";
import donatedShowing from "../assets/donated-showing.png";
import inactiveHidden from "../assets/inactive-hidden.png";
import inactiveShowing from "../assets/inactive-showing.png";
import northernHemisphere from "../assets/northern-hemisphere.png";
import southernHemisphere from "../assets/southern-hemisphere.png";
import showingFish from "../assets/showing-fish.png";
import showingBugs from "../assets/showing-bugs.png";
import showingSeaCreatures from "../assets/showing-sea-creatures.png";
import showingAll from "../assets/showing-all.png";
import { Checkbox, CustomCheckboxProps } from "../components/Checkbox";
import {
  CustomRadioButtonProps,
  RadioButtons,
} from "../components/RadioButtons";

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const wrapperClasses = cxs("flex items-center", props.lastItem ? "" : "mr1x");
  const radioClasses = cxs(
    "w1 h1 radius100p mr1x flex flex-none items-center justify-center",
    props.isChecked ? "bg-brown-800" : "bg-brown-800_30"
  );
  const radioMarkerClasses = "radius100p bg-cream-200 w40p h40p";

  return (
    <div className={wrapperClasses}>
      <div className={radioClasses}>
        {props.isChecked && <div className={radioMarkerClasses}></div>}
      </div>
      <span
        className={cxs("w-max-content", props.isFocused ? "text-bold" : "")}
      >
        {props.children}
      </span>
    </div>
  );
};

const CustomCheckbox = (props: CustomCheckboxProps) => {
  const checkboxWrapperClasses = cxs(
    "w1 h1 mr1x radius0.25 flex items-center justify-center",
    props.isChecked ? "bg-brown-800" : "bg-brown-800_30"
  );
  const checkedMarkerClasses = cxs("w40p h40p bg-cream-200");

  return (
    <div className="flex items-center">
      <div className={checkboxWrapperClasses}>
        {props.isChecked && <div className={checkedMarkerClasses}></div>}
      </div>
      <span className={props.isFocused ? "text-bold" : ""}>
        {props.children}
      </span>
    </div>
  );
};

const Section = (props: {
  className?: string;
  children: React.ReactNode;
  imageUrl: string;
  sectionTitle: string;
  imageAlt: string;
}) => {
  const classNames = cxs("flex", props.className);
  return (
    <div className={classNames}>
      <div>
        <img
          src={props.imageUrl}
          className="mr1x"
          style={{ width: "3rem" }}
          alt={props.imageAlt}
        />
      </div>
      <div className="flex flex-column justify-center">
        <h3 className="fz14px text-uppercase ls0.1 text-brown-800_70 mb0.25">
          {props.sectionTitle}
        </h3>
        {props.children}
      </div>
    </div>
  );
};

const getCritterTypeInfo = (
  critterType: CritterType | "all"
): { imgSrc: string; altText: string } => {
  if (critterType === "fish") {
    return {
      imgSrc: showingFish,
      altText: `Icon of a fish`,
    };
  } else if (critterType === "bug") {
    return {
      imgSrc: showingBugs,
      altText: `Icon of a butterfly`,
    };
  } else if (critterType === "sea-creature") {
    return {
      imgSrc: showingSeaCreatures,
      altText: `Icon of an octopus`,
    };
  } else {
    return {
      imgSrc: showingAll,
      altText: `Icon of a fish, a bug and an octopus`,
    };
  }
};

const StatSection = (props: { stat: string; label: string }) => {
  return (
    <p className="fz20px text-brown-400">
      {props.stat}
      <span className="text-uppercase block fz14px text-bold text-brown-800">
        {props.label}
      </span>
    </p>
  );
};

export const CritterAppSettings = (props: {
  settingsOpen: boolean;
  setSettingsVisibility: Function;
  showDonated: boolean;
  setShowDonated: Function;
  showInactive: boolean;
  setShowInactive: Function;
  hemisphere: Hemisphere;
  setHemisphere: Function;
  critterType: CritterType | "all";
  setCritter: Function;
  donationsCount: { bugs: number; fish: number; seaCreatures: number };
}) => {
  const [settingsOpen, setSettingsOpen] = useState(props.settingsOpen);
  const { altText, imgSrc } = getCritterTypeInfo(props.critterType);
  const settingsText = settingsOpen ? "Hide settings" : "Show Settings";
  return (
    <div className="bg-cream-200 px3x shadow-1 z1 relative">
      <div className="layout-stats-header block w100p py2x">
        <StatSection stat={`${props.donationsCount.bugs} / 80`} label="bugs" />
        <StatSection stat={`${props.donationsCount.fish} / 80`} label="fish" />
        <StatSection
          stat={`${props.donationsCount.seaCreatures} / 40`}
          label="Sea Creatures"
        />

        <button
          className="jself-end p1x bg-brown-800 text-cream-200 radius1x text-center fz16px flex justify-center items-center"
          onClick={() => {
            const newState = !settingsOpen;
            setSettingsOpen(newState);
            props.setSettingsVisibility(newState);
          }}
        >
          <img
            className="display-none-sm w3x h3x"
            src={settingsIcon}
            alt={settingsText}
          />
          <span className="display-none inline-sm">{settingsText}</span>
        </button>
      </div>

      {settingsOpen && (
        <form className="py2x border border-top border-brown_28 layout-form text-brown-800">
          <Section
            imageUrl={props.showDonated ? donatedShowing : donatedHidden}
            sectionTitle="Donations"
            imageAlt="Blathers icon"
          >
            <Checkbox
              onChange={props.setShowDonated}
              isChecked={props.showDonated}
            >
              <CustomCheckbox>Show donated</CustomCheckbox>
            </Checkbox>
          </Section>

          <Section
            imageUrl={props.showInactive ? inactiveShowing : inactiveHidden}
            sectionTitle="Activity"
            imageAlt="Square representing active and inactive critters"
          >
            <Checkbox
              onChange={props.setShowInactive}
              isChecked={props.showInactive}
            >
              <CustomCheckbox>Show inactive</CustomCheckbox>
            </Checkbox>
          </Section>

          <Section
            imageUrl={
              props.hemisphere === "northern"
                ? northernHemisphere
                : southernHemisphere
            }
            sectionTitle="Hemisphere"
            imageAlt={`Sphere highlighted on the ${props.hemisphere} hemisphere`}
          >
            <RadioButtons
              radioGroupName="hemisphere"
              className="flex"
              onChange={props.setHemisphere}
              checkedItem={props.hemisphere}
            >
              <CustomRadioButton value="northern">North</CustomRadioButton>
              <CustomRadioButton value="southern">South</CustomRadioButton>
            </RadioButtons>
          </Section>
          <Section imageUrl={imgSrc} sectionTitle="Critters" imageAlt={altText}>
            <RadioButtons
              radioGroupName="critters"
              className="flex flex-wrap"
              onChange={props.setCritter}
              checkedItem={props.critterType}
            >
              <CustomRadioButton value="bug">Bugs</CustomRadioButton>
              <CustomRadioButton value="fish">Fish</CustomRadioButton>
              <CustomRadioButton value="sea-creature">
                Sea creatures
              </CustomRadioButton>
              <CustomRadioButton value="all">All</CustomRadioButton>
            </RadioButtons>
          </Section>
        </form>
      )}
    </div>
  );
};
