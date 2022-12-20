import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Tab from "../../../components/Tab";
import { IconArrowDown } from "../../../icons";
import { useMarketplace } from "../MarketplaceContext";

const SelectPickerButton = ({ value, onClick }: { value: any; onClick: () => void }) => {
  return (
    <button
      className="flex h-fit items-center text-center gap-x-0.5 px-2 pt-2.5 pb-3 rounded text-h6 text-bg bg-white"
      onClick={onClick}
    >
      {value}
      <IconArrowDown className="fill-black w-4 h-4" />
    </button>
  );
};
const MobileFilter = () => {
  const { filterValues, filterTabValue, setFilterTabValue, dayValues, dayTabValue, setDayTabValue } = useMarketplace();
  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState<any>();

  const onShowFilterTabModal = () => {
    setShowModal(true);

    setTemplate(
      <Tab initTab={filterTabValue} className="third flex flex-col" onChange={(tab) => setFilterTabValue(tab)}>
        {filterValues.map((filterValue) => (
          <Tab.Item key={filterValue} id={filterValue}>
            {filterValue}
          </Tab.Item>
        ))}
      </Tab>
    );
  };

  const onShowDayTabModal = () => {
    setShowModal(true);
    setTemplate(
      <Tab initTab={dayTabValue} className="third flex flex-col" onChange={(tab) => setDayTabValue(tab)}>
        {dayValues.map((dayValue) => (
          <Tab.Item key={dayValue.id} id={dayValue.id}>
            {dayValue.text}
          </Tab.Item>
        ))}
      </Tab>
    );
  };

  return (
    <>
      <Modal show={showModal} title="PLEASE SELECT" onClose={() => setShowModal(false)}>
        {template}
      </Modal>

      <div className="border-t border-b border-gray">
        <div className={"container flex justify-between items-center"}>
          <SelectPickerButton value={filterTabValue} onClick={onShowFilterTabModal} />
          <SelectPickerButton value={dayTabValue} onClick={onShowDayTabModal} />
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
