import React, { useState, useEffect, useContext } from "react";
import { SvgDonatedOwl } from "../assets/SvgDonatedOwl";
import { CritterProps, Hemisphere } from "../types";
import { getCritterImageUrl } from "./utils";
import { Interval, DateTime } from "luxon";
import { FilterContext } from "../App";

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
        isDonated ? "o100p" : "o10p o0p-sm"
      } focus-o100p hover-o100p absolute r-1x t-1x `}
    >
      <SvgDonatedOwl className="fill-brown-800" />
    </button>
  );
};

const timeText = (
  timeOfYear: Interval[],
  timeOfYearOpposite: Interval[],
  timeOfDay: Interval[],
  currentHemisphere: Hemisphere
) => {
  const now = DateTime.local();
  const isAvailableAllDay = timeOfDay[0].toDuration("hours").hours > 23;
  const isAvailableAllYear = timeOfYear[0].toDuration("months").months > 11;
  const isOutOfSeasonInCurrentHemisphere = timeOfYear.every((monthRange) => {
    return !monthRange.contains(DateTime.local());
  });
  const isInSeasonInOppositeHemisphere = timeOfYearOpposite.some(
    (monthRange) => {
      return monthRange.contains(DateTime.local());
    }
  );

  const oppositeHemisphere =
    currentHemisphere === "northern" ? "Southern" : "Northern";

  let formattedTimeOfYear: string;
  let formattedTimeOfDay: string;

  formattedTimeOfYear = timeOfYear
    .map((months) => months.toFormat("LLLL"))
    .join(", ");

  formattedTimeOfDay = timeOfDay
    .map((hours) => hours.toFormat("ha"))
    .join(", ")
    .toLowerCase();

  if (isAvailableAllDay) {
    formattedTimeOfDay = "All day";
  }

  if (isAvailableAllYear) {
    formattedTimeOfYear = "All year";
  }

  if (isOutOfSeasonInCurrentHemisphere) {
    const sortedIntervals = timeOfYear.sort((a, b) => {
      if (now.diff(a.start, "months") < now.diff(b.start, "months")) {
        return -1;
      } else if (now.diff(a.start, "months") > now.diff(b.start, "months")) {
        return 1;
      } else {
        return 0;
      }
    });
    if (isInSeasonInOppositeHemisphere) {
      formattedTimeOfYear = `Currently in season in the ${oppositeHemisphere} hemisphere.`;
    } else {
      formattedTimeOfYear = `Will not be active until ${sortedIntervals[0].start.toFormat(
        "LLLL"
      )}.`;
    }
  }

  return [formattedTimeOfYear, formattedTimeOfDay];
};

export const CritterCard = (props: Props) => {
  const currentHemisphere = useContext(FilterContext).state.hemisphere;
  const [activityText, setActivityText] = useState(
    timeText(
      props.timeOfYearFound,
      props.timeOfYearFoundOpposite,
      props.timeOfDayFound,
      currentHemisphere
    )
  );
  const [timeOfYearText, timeOfDayText] = activityText;

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityText(
        timeText(
          props.timeOfYearFound,
          props.timeOfYearFoundOpposite,
          props.timeOfDayFound,
          currentHemisphere
        )
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [
    currentHemisphere,
    props.timeOfDayFound,
    props.timeOfYearFound,
    props.timeOfYearFoundOpposite,
  ]);

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
        <DetailSection title="Seasonality" details={timeOfYearText} />
        <DetailSection title="Time" details={timeOfDayText} />
        <DetailSection title="Price" details={`${props.bells}`} />
      </div>
    </div>
  );
};
