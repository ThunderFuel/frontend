import { IconClose } from "icons";
import React, { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  children: React.ReactNode;
  title: string;
  setshowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, title, setshowModal }: ModalProps) => {
  const body = document.querySelector("body");
  if (body) body.style.overflow = "hidden";

  function onClose() {
    setshowModal(false);
    if (body) {
      body.style.overflow = "auto";
    }
  }

  return (
    <div className="fixed flex w-screen h-screen justify-center items-center  top-0 left-0 overflow-hidden bg-[rgba(37,37,37,0.98)]">
      <div className="flex flex-col w-[335px] bg-bg rounded-lg">
        <div className="container flex justify-between items-center py-5 border-b border-gray ">
          <h6 className="text-head6 text-headlineMd font-bigShoulderDisplay text-white">{title}</h6>
          <div
            className=" flex justify-center items-center w-[26px] h-[26px] bg-bg-light rounded-full"
            onClick={() => onClose()}
          >
            <IconClose />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
