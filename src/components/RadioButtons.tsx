import React, { useState } from "react";

export interface RadioItemProps {
  checked?: boolean;
  children: string;
  lastItem?: boolean;
  value: string;
}

interface RadioButtonsProps {
  children: React.ReactElement<RadioItemProps>[];
  radioGroupName: string;
  className?: string;
  onChange?: Function;
}

export const RadioButtons = (props: RadioButtonsProps) => {
  const firstItem = props.children[0].props.children;
  const [checked, setChecked] = useState(firstItem);

  return (
    <fieldset className={props.className}>
      {React.Children.map(props.children, (child, i) => {
        const { children, value } = child.props;
        const isChecked = checked === children;
        return (
          <label key={i}>
            <input
              checked={isChecked}
              className="o0p absolute"
              id={`${props.radioGroupName}-${value}`}
              name={props.radioGroupName}
              onChange={() => {
                setChecked(children);
                if (props.onChange) {
                  props.onChange(value);
                }
              }}
              type="radio"
              value={value}
            />
            {React.cloneElement(child, {
              checked: isChecked,
              lastItem: props.children.length === i,
            })}
          </label>
        );
      })}
    </fieldset>
  );
};
