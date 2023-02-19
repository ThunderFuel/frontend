import React from "react";
import Select, { ISelectOption } from "components/Select";

export const selectExpirationDates: ISelectOption[] = [
  {
    text: "1 day",
    value: 1,
  },
  {
    text: "3 days",
    value: 3,
  },
  {
    text: "7 days",
    value: 7,
  },
  {
    text: "1 month",
    value: 30,
  },
  {
    text: "3 months",
    value: 90,
  },
  {
    text: "6 months",
    value: 180,
  },
];

const SelectExpiredDate = ({ value, onChange }: any) => {
  return <Select options={selectExpirationDates} onChange={onChange} value={value ?? selectExpirationDates[0]} direction={"top"} />;
};

export default SelectExpiredDate;
