import React, { useState } from "react";
import { SvgDonatedOwl } from "../assets/SvgDonatedOwl";
import { CritterProps } from "../types";
import { getCritterImageUrl } from "./utils";

type Props = CritterProps & {
  activeNow: boolean;
  donations: string[];
  setDonations: Function;
};

interface DetailSectionProps {
  title: string;
  details: string;
}

const DetailSection = (props: DetailSectionProps) => {
  return (
    <div>
      <h4 className="fz12px text-uppercase ls0.1">{props.title}</h4>
      <p className="fz14px text-brown-400">{props.details}</p>
    </div>
  );
};

const DonatedButton = (props: {
  donatedId: string;
  donations: string[];
  setDonations: Function;
}) => {
  const previouslyDonated = props.donations.indexOf(props.donatedId) !== -1;
  const [isDonated, setIsDonated] = useState(previouslyDonated);

  const handleButtonClick = () => {
    const donatedIdPosition = props.donations.indexOf(props.donatedId);
    if (isDonated) {
      props.donations?.splice(donatedIdPosition, 1);
      props.setDonations(props.donations);
      setIsDonated(false);
    } else {
      props.setDonations(props.donations.concat(props.donatedId));
      setIsDonated(true);
    }
  };

  return (
    <button
      onClick={() => handleButtonClick()}
      className={`${
        isDonated ? "o100p" : "o0p"
      } focus-o100p hover-o100p absolute r-1x t-1x `}
    >
      <SvgDonatedOwl className="fill-brown-800" />
    </button>
  );
};

export const CritterCard = (props: Props) => {
  return (
    <div className="critter-card bg-cream-200 radius1x shadow1 relative p2x text-brown-800 mb6x">
      <DonatedButton
        key={props.critterId}
        donatedId={props.critterId}
        donations={props.donations}
        setDonations={props.setDonations}
      />
      <div className="critter-card__header items-center border-bottom border-brown_28 pb2x mb2x">
        <div className="grid-critter-image flex flex-column items-center">
          <img
            src={getCritterImageUrl(props.name, props.index, props.critterType)}
            alt={props.name}
            style={{ width: "3rem" }}
          />
          {props.activeNow && (
            <p className="fz12px bg-green text-cream-200 text-bold radius0.25 inline-block px1x py0.2">
              Active
            </p>
          )}
        </div>
        <div className="grid-critter-name-where">
          <h3 className="fz20px">{props.name}</h3>
          <p className="fz14px">{props.whereFound}</p>
        </div>
      </div>
      <div className="critter-card__details">
        <DetailSection
          title="Seasonality"
          details="You’ve got plenty of time to catch them."
        />
        <DetailSection
          title="Time"
          details="You’ve got plenty of time to catch them."
        />
        <DetailSection title="Price" details={`${props.bells}`} />
      </div>
    </div>
  );
};
