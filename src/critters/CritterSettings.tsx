import React, { useState } from "react";
import { Hemisphere, CritterType } from "../types";
import { cxs } from "../utils/className";
import donatedHidden from "../assets/donated-hidden.png";
import donatedShowing from "../assets/donated-showing.png";
import inactiveHidden from "../assets/inactive-hidden.png";
import inactiveShowing from "../assets/inactive-showing.png";
import northernHemisphere from "../assets/northern-hemisphere.png";
import southernHemisphere from "../assets/southern-hemisphere.png";
import showingFish from "../assets/showing-fish.png";
import showingBugs from "../assets/showing-bugs.png";
import showingBoth from "../assets/showing-both.png";
import { Checkbox, CustomCheckboxProps } from "../components/Checkbox";
import {
  CustomRadioButtonProps,
  RadioButtons,
} from "../components/RadioButtons";

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const wrapperClasses = cxs("flex items-center", props.lastItem ? "" : "mr1x");
  const radioClasses = cxs(
    "w1 h1 radius100p mr1x flex items-center justify-center",
    props.isChecked ? "bg-brown-800" : "bg-brown-800_30"
  );
  const radioMarkerClasses = "radius100p bg-cream-200 w40p h40p";

  return (
    <div className={wrapperClasses}>
      <div className={radioClasses}>
        {props.isChecked && <div className={radioMarkerClasses}></div>}
      </div>
      <span className={props.isFocused ? "text-bold" : ""}>
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
      <img
        src={props.imageUrl}
        className="mr1x"
        style={{ width: "3rem" }}
        alt={props.imageAlt}
      />
      <div className="flex flex-column justify-center">
        <h3 className="fz14px text-uppercase ls0.1 text-brown-800_70 mb0.25">
          {props.sectionTitle}
        </h3>
        {props.children}
      </div>
    </div>
  );
};

const getCritterTypeImageUrl = (critterType: CritterType | "both") => {
  if (critterType === "fish") {
    return showingFish;
  } else if (critterType === "bug") {
    return showingBugs;
  } else {
    return showingBoth;
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
  showDonated: boolean;
  setShowDonated: Function;
  showInactive: boolean;
  setShowInactive: Function;
  hemisphere: Hemisphere;
  setHemisphere: Function;
  critterType: CritterType | "both";
  setCritter: Function;
}) => {
  const [settingsOpen, setSettingsOpen] = useState(true);

  return (
    <div className="bg-cream-200 px3x">
      <div className="layout-stats-header block w100p py2x">
        <StatSection stat="30 / 80" label="bugs" />
        <StatSection stat="50 / 80" label="fish" />

        <button
          className="jself-end p1x bg-brown-800 text-cream-200 radius1x text-center"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          {settingsOpen ? "Hide settings" : "Show Settings"}
        </button>
      </div>

      {settingsOpen && (
        <form className="py2x border border-top border-brown_28 layout-form text-brown-800">
          <Section
            imageUrl={props.showDonated ? donatedShowing : donatedHidden}
            sectionTitle="Donations"
            imageAlt="Blathers icon"
          >
            <Checkbox onChange={props.setShowDonated}>
              <CustomCheckbox>Show donated</CustomCheckbox>
            </Checkbox>
          </Section>

          <Section
            imageUrl={props.showInactive ? inactiveShowing : inactiveHidden}
            sectionTitle="Activity"
            imageAlt="Square representing active and inactive critters"
          >
            <Checkbox onChange={props.setShowInactive}>
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
            >
              <CustomRadioButton value="northern">North</CustomRadioButton>
              <CustomRadioButton value="southern">South</CustomRadioButton>
            </RadioButtons>
          </Section>
          <Section
            imageUrl={getCritterTypeImageUrl(props.critterType)}
            sectionTitle="Critters"
            imageAlt={
              props.critterType === "both"
                ? `Icon of a bug and a fish`
                : `Icon of a ${props.critterType}`
            }
          >
            <RadioButtons
              radioGroupName="critters"
              className="flex"
              onChange={props.setCritter}
            >
              <CustomRadioButton value="bug">Bugs</CustomRadioButton>
              <CustomRadioButton value="fish">Fish</CustomRadioButton>
              <CustomRadioButton value="both">Both</CustomRadioButton>
            </RadioButtons>
          </Section>
        </form>
      )}
    </div>
  );
};
