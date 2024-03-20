import React from "react";
import Select, { ISelectOption } from "components/Select";
import Dropdown from "components/Dropdown";
import { useIsMobile } from "hooks/useIsMobile";
import { IconOrder } from "icons";
import Button from "components/Button";

const options: ISelectOption[] = [
  {
    text: "Price Low to High",
    value: 1,
  },
  {
    text: "Price High to Low",
    value: 2,
  },
  {
    text: "Recently Listed",
    value: 3,
  },
  {
    text: "Highest Last Sale",
    value: 4,
  },
  {
    text: "Lowest Last Sale",
    value: 5,
  },
];

const MobileSelectOrderBy = (props: any) => {
  return (
    <Dropdown options={options} onClick={props.onClick}>
      <Button className="btn-icon text-white">
        <IconOrder />
      </Button>
    </Dropdown>
  );
};

const SelectOrderBy = (props: any) => {
  const defaultOption = options.find((option) => option.value === props.value) ?? options[0];
  const [value, setValue] = React.useState(defaultOption);

  if (useIsMobile()) {
    return <MobileSelectOrderBy onClick={(option: any) => props?.onChange(option)}></MobileSelectOrderBy>;
  }

  return (
    <div>
      <Select
        className="flex"
        options={options}
        value={value}
        onChange={(option) => {
          setValue(option);
          props?.onChange(option);
        }}
      />
    </div>
  );
};

export default SelectOrderBy;
