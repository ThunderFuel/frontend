import React, { useState } from "react";
import Tab from "components/Tab";
import { useIsMobile } from "hooks/useIsMobile";
import { IconArrowDown } from "icons";
import Modal from "components/Modal";

const dayValues = [
  {
    text: "1H",
    value: 1,
  },
  {
    text: "6H",
    value: 6,
  },
  {
    text: "24H",
    value: 24,
  },
  {
    text: "7D",
    value: 24 * 7,
  },
  {
    text: "30D",
    value: 24 * 7 * 30,
  },
];

const filterValues = ["Trending", "Top", "Watchlist"];

const Filter = () => {
  const [dayValue, setdayValue] = useState(dayValues[2]);
  const [filterValue, setfilterValue] = useState(filterValues[0]);
  const [showModal, setshowModal] = useState(false);
  const [modalData, setmodalData] = useState<any>(filterValues);

  function renderData() {
    return modalData.map((i: any) => (
      <Tab.Item key={i.text ? i.text : i} id={i.text ? i.text : i}>
        {i.text ? i.text : i}
      </Tab.Item>
    ));
  }

  return (
    <>
      {useIsMobile() ? (
        <>
          {showModal && (
            <Modal setshowModal={setshowModal} title="PLEASE SELECT">
              <Tab
                initTab={modalData.includes(filterValue) ? filterValue : dayValue.text}
                className="third flex flex-col"
                onChange={(i) =>
                  modalData.includes(i)
                    ? setfilterValue(i.toString())
                    : setdayValue(modalData.find((k: any) => i === k.text))
                }
              >
                {renderData()}
              </Tab>
            </Modal>
          )}

          <div className="container flex justify-between items-center border-t border-b border-gray">
            <button
              className="flex items-center text-center gap-x-[6px] px-8 py-[26px] text-head6 font-spaceGrotesk text-white bg-bg-light border-x border-gray border-b border-b-white"
              onClick={() => {
                setshowModal(true);
                setmodalData(filterValues);
              }}
            >
              {filterValue} <IconArrowDown />
            </button>
            <button
              className="flex h-fit items-center text-center gap-x-[2px] px-2 pt-[10px] pb-3 rounded text-head6 font-spaceGrotesk text-bg bg-white"
              onClick={() => {
                setshowModal(true);
                setmodalData(dayValues);
              }}
            >
              {dayValue.text} <IconArrowDown fill="black" width="17px" height="17px" />
            </button>
          </div>
        </>
      ) : (
        <div className="border-t border-b border-gray">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-7 items-center">
              <Tab initTab={"top"} className="secondary">
                <Tab.Item id={"trending"}>Trending</Tab.Item>
                <Tab.Item id={"top"}>Top</Tab.Item>
                <Tab.Item id={"watchlist"}>Watchlist</Tab.Item>
              </Tab>
              <div className="w-full lg:w-auto">
                <Tab initTab={1}>
                  {dayValues.map((day) => (
                    <Tab.Item key={day.value} id={day.value}>
                      {day.text}
                    </Tab.Item>
                  ))}
                </Tab>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
