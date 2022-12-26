import clsx from "clsx";
import { IconClose } from "icons";
import React, { Dispatch, SetStateAction } from "react";
import "./Modal.css";

export interface ModalProps {
  className?: string;
  footer?: JSX.Element;
  checkoutProcess?: JSX.Element;
  children: React.ReactNode;
  title: string;
  setshowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ className, footer, children, checkoutProcess, title, setshowModal }: ModalProps) => {
  const body = document.querySelector("body");
  if (body) body.style.overflow = "hidden";

  function onClose() {
    setshowModal(false);
    if (body) {
      body.style.overflow = "auto";
    }
  }

  return (
    <div className={clsx(className ? className : "modalbase")}>
      <div className="modal">
        <div className="mhead">
          <h6 className="mtitle">{title}</h6>
          <button
            className="flex justify-center items-center w-[26px] h-[26px] bg-bg-light rounded-full"
            onClick={() => onClose()}
          >
            <IconClose />
          </button>
        </div>
        <div className="flex flex-col overflow-y-scroll no-scrollbar ">
          {children}
          {checkoutProcess && <div className="flex border-t border-gray">{checkoutProcess}</div>}
        </div>

        {footer && <div className="mt-auto w-full border-t border-gray">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
