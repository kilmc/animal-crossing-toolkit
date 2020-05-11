import React, { useState } from "react";
import { cxs } from "../utils/className";

export interface CustomCheckboxProps {
  checked?: boolean;
  children: string;
}

interface CheckboxProps {
  children: React.ReactElement<CustomCheckboxProps>;
  onChange?: Function;
}

export const Checkbox = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const child = React.Children.only(props.children);
  const classes = cxs(isFocused ? "text-bold" : "");

  return (
    <fieldset className={classes}>
      <label>
        <input
          type="checkbox"
          className="o0p absolute"
          checked={checked}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={() => {
            const newChecked = !checked;
            if (props.onChange) {
              props.onChange(newChecked);
            }
            setChecked(newChecked);
          }}
        />
        {React.cloneElement(child, {
          checked,
        })}
      </label>
    </fieldset>
  );
};
