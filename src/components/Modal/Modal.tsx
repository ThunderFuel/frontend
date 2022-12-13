import Tab from "components/Tab";
import { IconClose } from "icons";
import React, { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  setshowModal: Dispatch<SetStateAction<boolean>>;
  setdayValue: Dispatch<SetStateAction<{ text: string; value: number }>>;
  dayValue: { text: string; value: number };
  setfilterValue: Dispatch<SetStateAction<string>>;
  filterValue: string;
  data: any[];
}

const Modal = (props: ModalProps) => {
  const body = document.querySelector("body");
  if (body) body.style.overflow = "hidden";

  function onClose() {
    props.setshowModal(false);
    if (body) {
      body.style.overflow = "auto";
    }
  }

  function renderData() {
    // eslint-disable-next-line react/jsx-key
    return props.data.map((i) => <Tab.Item id={i.text ? i.text : i}>{i.text ? i.text : i}</Tab.Item>);
  }

  return (
    <div
      className="fixed flex w-screen h-screen justify-center items-center  top-0 left-0 overflow-hidden bg-[rgba(37,37,37,0.98)]"
      {...props}
    >
      <div className="flex flex-col w-[335px] bg-bg rounded-lg">
        <div className="container flex justify-between items-center py-5 border-b border-gray ">
          <h6 className="text-head6 text-headlineMd font-bigShoulderDisplay text-white">PLEASE SELECT</h6>
          <div
            className=" flex justify-center items-center w-[26px] h-[26px] bg-bg-light rounded-full"
            onClick={() => onClose()}
          >
            <IconClose />
          </div>
        </div>
        <Tab
          initTab={props.data.includes(props.filterValue) ? props.filterValue : props.dayValue.text}
          className="third flex flex-col"
          onChange={(i) =>
            props.data.includes(i)
              ? props.setfilterValue(i.toString())
              : props.setdayValue(props.data.find((k) => i === k.text))
          }
        >
          {renderData()}
        </Tab>
      </div>
    </div>
  );
};

export default Modal;
