import React from "react";
import Input from "components/Input";
import InputRangeBase from "components/InputRange";

const RangeBar = () => {
  const [value, setValue] = React.useState({
    min: 5,
    max: 10,
  });
  const onChange = (v: any) => {
    console.log(v);
    setValue(v);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputRangeBase value={value} onChange={onChange} draggableTrack maxValue={20} minValue={0} />
      <div className="flex justify-between">
        <Input value={value.min} />
        <Input value={value.max} />
      </div>
    </div>
  );
};

export default RangeBar;
