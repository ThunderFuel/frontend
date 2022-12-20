import React from "react";
import clsx from "clsx";
import { IconClose } from "icons";
import "./Modal.css";

export interface ModalProps {
  className?: string;
  footer?: JSX.Element;
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  show: boolean;
}

const body = document.querySelector("body");

const Modal = ({ show, className, footer, children, title, ...etc }: ModalProps) => {
  React.useEffect(() => {
    if (show && body) {
      body.style.overflow = "hidden";
    } else if (body) {
      body.style.overflow = "auto";
    }
  }, [show]);
  if (!show) {
    return null;
  }

  return (
    <div className={clsx("modalbase", className)}>
      <div className="modal">
        <div className="mhead">
          <h6 className="mtitle">{title}</h6>
          <button className="flex justify-center items-center w-6 h-6 bg-bg-light rounded-full" onClick={etc.onClose}>
            <IconClose />
          </button>
        </div>
        {children}
        <div className="flex">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
