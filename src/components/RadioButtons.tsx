import React, { useState } from "react";

export interface CustomRadioButtonProps {
  isChecked?: boolean;
  isFocused?: boolean;
  children: string;
  lastItem?: boolean;
  value: string;
}

const RadioButton = (props: {
  children: React.ReactElement<CustomRadioButtonProps>;
  radioGroupName?: string;
  onChange?: Function;
  isChecked?: boolean;
  value: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const child = React.Children.only(props.children);

  return (
    <label>
      <input
        type="radio"
        id={`${props.radioGroupName}-${child.props.value}`}
        name={props.radioGroupName}
        className="o0p absolute"
        checked={props.isChecked}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={() => {
          if (props.onChange) {
            props.onChange(props.value);
          }
        }}
      />
      {React.cloneElement(child, {
        isChecked: props.isChecked,
        isFocused,
      })}
    </label>
  );
};

interface RadioButtonsProps {
  children: React.ReactElement<CustomRadioButtonProps>[];
  radioGroupName: string;
  className?: string;
  onChange?: Function;
  checkedItem: string;
}

export const RadioButtons = (props: RadioButtonsProps) => {
  const [checkedItem, setCheckedItem] = useState(props.checkedItem);

  return (
    <fieldset className={props.className}>
      {React.Children.map(props.children, (child, i) => {
        const isChecked = checkedItem === child.props.value;
        return (
          <RadioButton
            radioGroupName={props.radioGroupName}
            onChange={() => {
              if (props.onChange) {
                props.onChange(child.props.value);
              }
              setCheckedItem(child.props.value);
            }}
            value={child.props.value}
            isChecked={isChecked}
          >
            {React.cloneElement(child, {
              lastItem: props.children.length - 1 === i,
            })}
          </RadioButton>
        );
      })}
    </fieldset>
  );
};
