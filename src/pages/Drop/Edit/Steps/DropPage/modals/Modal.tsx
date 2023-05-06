import React from "react";
import ModalBase from "components/Modal";
import Button from "components/Button";
import { IconCircleLeft } from "icons";

const ModalHeader = ({ children, showBackButton, onBack }: { showBackButton?: boolean; children: any; onBack?: any }) => {
  return (
    <h5 className="text-h5">
      <div className="flex items-center gap-2.5">
        {showBackButton && (
          <button className="flex justify-center items-center w-6 h-6 bg-bg-light rounded-full" onClick={onBack}>
            <IconCircleLeft />
          </button>
        )}

        {children}
      </div>
    </h5>
  );
};

export const ModalFooter = ({ onClose, children = "DONE" }: any) => {
  return (
    <div className="p-5">
      <Button className="w-full" onClick={onClose}>
        {children}
      </Button>
    </div>
  );
};

const Modal = ({ title, footer, showBackButton, onBack, children, ...etc }: any) => {
  return (
    <ModalBase
      {...etc}
      bodyClassName="max-w-[750px] !w-full"
      title={
        <ModalHeader showBackButton={showBackButton} onBack={onBack}>
          {title}
        </ModalHeader>
      }
      footer={footer}
    >
      <div style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="p-5">{children}</div>
      </div>
    </ModalBase>
  );
};

export default Object.assign(Modal, {
  Header: ModalHeader,
  Footer: ModalFooter,
});
