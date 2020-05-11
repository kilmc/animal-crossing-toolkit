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
import { RadioItemProps, RadioButtons } from "../components/RadioButtons";

const CustomRadio = (props: RadioItemProps) => {
  return (
    <div className={`flex items-center ${props.lastItem ? "" : "mr1x"}`}>
      <div
        className={`w1 h1 radius100p mr1x flex items-center justify-center ${
          props.checked ? "bg-brown-800" : "bg-brown-800_30"
        }`}
      >
        {props.checked && (
          <div
            style={{ width: "40%", height: "40%" }}
            className="radius100p bg-cream-200"
          ></div>
        )}
      </div>
      <span>{props.children}</span>
    </div>
  );
};

const CustomCheckbox = (props: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`w1 h1 mr1x radius0.25 flex items-center justify-center ${
          props.checked ? "bg-brown-800" : "bg-brown-800_30"
        }`}
      >
        {props.checked && (
          <div
            style={{ width: "40%", height: "40%" }}
            className="bg-cream-200"
          ></div>
        )}
      </div>
      <span>{props.children}</span>
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
  const donatedImageUrl = props.showDonated ? donatedShowing : donatedHidden;
  const inactiveImageUrl = props.showInactive
    ? inactiveShowing
    : inactiveHidden;
  const hemisphereImageUrl =
    props.hemisphere === "northern" ? northernHemisphere : southernHemisphere;
  const critterImageUrl = getCritterTypeImageUrl(props.critterType);

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
        <form className="py2x border border-top border-brown_28 layout-form">
          <Section
            imageUrl={donatedImageUrl}
            sectionTitle="Donations"
            imageAlt="Blathers icon"
          >
            <Checkbox onChange={props.setShowDonated}>
              <CustomCheckbox>Show donated</CustomCheckbox>
            </Checkbox>
          </Section>

          <Section
            imageUrl={inactiveImageUrl}
            sectionTitle="Activity"
            imageAlt="Square representing active and inactive critters"
          >
            <Checkbox onChange={props.setShowInactive}>
              <CustomCheckbox>Show inactive</CustomCheckbox>
            </Checkbox>
          </Section>

          <Section
            imageUrl={hemisphereImageUrl}
            sectionTitle="Hemisphere"
            imageAlt={`Sphere highlighted on the ${props.hemisphere} hemisphere`}
          >
            <RadioButtons
              radioGroupName="hemisphere"
              className="flex"
              onChange={props.setHemisphere}
            >
              <CustomRadio value="northern">North</CustomRadio>
              <CustomRadio value="southern">South</CustomRadio>
            </RadioButtons>
          </Section>
          <Section
            imageUrl={critterImageUrl}
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
              <CustomRadio value="bug">Bugs</CustomRadio>
              <CustomRadio value="fish">Fish</CustomRadio>
              <CustomRadio value="both">Both</CustomRadio>
            </RadioButtons>
          </Section>
        </form>
      )}
    </div>
  );
};
