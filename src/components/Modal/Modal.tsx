import React, { useState } from "react";
import clsx from "clsx";
import { IconAccept, IconClose, IconDone, IconTransfer } from "icons";
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
            {!etc.backdropDisabled && (
              <button className="flex justify-center items-center w-8 h-8 bg-gray rounded-full" onClick={etc.onClose}>
                <IconClose className="text-white w-3 h-3" />
              </button>
            )}
          </div>
        )}
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">{children}</div>

        {footer && <div className="mt-auto w-full border-t border-gray">{footer}</div>}
      </div>
    </div>
  );
};

const TabItem = ({ children }: any) => {
  return children;
};

const Tabs = ({ activeItem, children, headersHidden }: any) => {
  // const [activeTab, setActiveTab] = useState(activeItem ?? 0);
  const content = React.useMemo(() => {
    return children.find((child: any, index: any) => index === activeItem);
  }, [activeItem]);
  const headers = React.useMemo(() => {
    return children.map((child: any, index: any) => ({
      index,
      icon: child.props.headerIcon,
      text: child.props.headerText,
    }));
  }, [children]);

  return (
    <div>
      {!headersHidden && (
        <div className="sticky top-0 flex w-full justify-between border-b border-gray text-h6 text-gray-light">
          {headers.map((header: any) => {
            const Icon = header.icon;

            return (
              <>
                <span key={header.index} className={clsx("flex items-center gap-2.5 w-full p-5 border-b border-gray", activeItem === header.index ? "text-white bg-bg-light border-white" : "")}>
                  {activeItem > header.index ? <IconDone className="text-green" /> : <Icon />}
                  {header.text}
                </span>
                <div className="flex-shrink-0 w-[1px] bg-gray" />
              </>
            );
          })}
        </div>
      )}
      {content.props.children}
    </div>
  );
};

export default Object.assign(Modal, {
  Tabs,
  TabItem,
});
