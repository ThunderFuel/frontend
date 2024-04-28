import React from "react";
import clsx from "clsx";
import { IconClose } from "icons";
import "./Modal.css";
import { useClickOutside } from "hooks/useClickOutside";

export interface ModalProps {
  className?: string;
  footer?: JSX.Element;
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
  show: boolean;
  bodyClassName?: string;
  modalTitle?: React.ReactNode;
  backdropDisabled?: boolean;
}

const body = document.querySelector("body");

const Modal = ({ className, footer, children, title, show, ...etc }: ModalProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (show && body) {
      body.style.overflow = "hidden";
    } else if (body) {
      body.style.overflow = "auto";
    }
  }, [show]);

  useClickOutside(containerRef, () => {
    if (etc.backdropDisabled) return;
    etc.onClose();
  });

  if (!show) {
    return null;
  }

  return (
    <div className={clsx(className, "modalbase")}>
      <div ref={containerRef} className={clsx("modal", etc.bodyClassName)}>
        {(title || etc.modalTitle) && (
          <div className="mhead">
            {etc.modalTitle ? etc.modalTitle : <h5 className="mtitle">{title}</h5>}
            <button className="flex justify-center items-center w-8 h-8 bg-gray rounded-full" onClick={etc.onClose}>
              <IconClose className="text-white w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">{children}</div>

        {footer && <div className="mt-auto w-full border-t border-gray">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
