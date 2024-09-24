import React, { ChangeEvent } from "react";
import clsx from "clsx";
import Checkbox from "components/CheckBox/Checkbox";
import InputSearch from "components/InputSearch";

const CheckboxList = ({ filterData, name, onChange, value }: any) => {
  const [search, setSearch] = React.useState("");
  const onSelect = (val: any) => {
    const tmpValue = value ?? [];

    const index = tmpValue.indexOf(val);
    if (index <= -1) {
      tmpValue.push(val);
    } else {
      tmpValue.splice(index, 1);
    }
    onChange(name, tmpValue);
  };

  const getFilterData = React.useMemo(() => {
    return filterData.filter((item: any) => item.text.trim().toLowerCase().includes(search));
  }, [filterData, search]);

  const result: any = getFilterData.map((item: any, i: number) => {
    const isChecked = Object.values(value ?? {}).includes(item.value);

    return (
      <div key={`${item.text}_${i}`} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", isChecked ? "bg-gray" : "")}>
        <Checkbox checked={isChecked} value={item.value} name={name} onClick={() => onSelect(item.value)}>
          <span className="body-medium">{item.text}</span>
        </Checkbox>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      {filterData.length > 10 ? <InputSearch value={search} placeholder="Search" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.trim().toLowerCase())} /> : null}
      <div className="flex flex-col gap-2 max-h-52 overflow-hidden overflow-y-auto">{result}</div>
    </div>
  );
};

export default CheckboxList;
