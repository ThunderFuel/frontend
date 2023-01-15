import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Tab from "../../../components/Tab";
import { useMarketplace } from "../MarketplaceContext";

const MobileFilter = () => {
  const { filterValues, filterTabValue, setFilterTabValue, dayValues, dayTabValue, setDayTabValue } = useMarketplace();
  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState<any>();

  const onShowFilterTabModal = () => {
    setShowModal(true);

    setTemplate(
      <Tab initTab={filterTabValue} className="third flex flex-col" onChange={(tab) => setFilterTabValue(tab)}>
        {filterValues.map((filterValue) => (
          <Tab.Item key={filterValue.value} id={filterValue}>
            {filterValue.text}
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
          <Tab.Item key={dayValue.value} id={dayValue}>
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
        <div className={"container-fluid flex justify-between items-center"}>
          <Tab.Button className="secondary" value={filterTabValue} onClick={onShowFilterTabModal} />
          <Tab.Button value={dayTabValue} onClick={onShowDayTabModal} />
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
