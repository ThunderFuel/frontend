import React from "react";
import InputRangeBase, { InputRangeClassNames, InputRangeProps } from "react-input-range";

const InputRange = (props: InputRangeProps) => {
  const classNames = {
    inputRange: "input-range",
    track: "input-range__track input-range__track--background",
    activeTrack: "input-range__track--active",
    sliderContainer: "input-range__slider-container",
    slider: "input-range__slider",
    labelContainer: "hidden",
  } as InputRangeClassNames;

  return <InputRangeBase {...props} classNames={classNames} />;
};

export default InputRange;
