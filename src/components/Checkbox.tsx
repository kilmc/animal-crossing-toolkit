import React, { useState } from "react";

export interface CustomCheckboxProps {
  isChecked?: boolean;
  isFocused?: boolean;
  children: string;
}

interface CheckboxProps {
  children: React.ReactElement<CustomCheckboxProps>;
  onChange?: Function;
}

export const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const child = React.Children.only(props.children);

  return (
    <fieldset>
      <label>
        <input
          type="checkbox"
          className="o0p absolute"
          checked={isChecked}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={() => {
            const newChecked = !isChecked;
            if (props.onChange) {
              props.onChange(newChecked);
            }
            setIsChecked(newChecked);
          }}
        />
        {React.cloneElement(child, {
          isChecked,
          isFocused,
        })}
      </label>
    </fieldset>
  );
};
