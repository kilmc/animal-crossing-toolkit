import React from "react";

export const SvgMenu = (props: { className?: string }) => {
  return (
    <svg
      width="20"
      height="15"
      viewBox="0 0 20 15"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <rect width="20" height="3" />
      <rect y="6" width="20" height="3" />
      <rect y="12" width="20" height="3" />
    </svg>
  );
};
