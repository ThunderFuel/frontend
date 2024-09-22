import React from "react";
import Status from "./components/Status";
import { useOfferContext } from "../OfferContext";

const MobileSidebarFilter = () => {
  const { onChangeFilterValue, filterValue } = useOfferContext();
  const onChange = (value: any) => {
    onChangeFilterValue(value);
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 p-2.5 border-b border-b-gray">
      <Status filterValue={filterValue} onChange={onChange} />
    </div>
  );
};

export default MobileSidebarFilter;
