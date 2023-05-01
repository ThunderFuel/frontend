import React from "react";
import ModalBase from "components/Modal";
import Button from "components/Button";

const ModalHeader = ({ children }: any) => {
  return <h5 className="text-h5">{children}</h5>;
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

const Modal = ({ title, footer, children, ...etc }: any) => {
  return (
    <ModalBase {...etc} bodyClassName="max-w-[750px] !w-full" title={<ModalHeader>{title}</ModalHeader>} footer={footer}>
      <div style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="p-5">{children}</div>
      </div>
    </ModalBase>
  );
};

export default Object.assign(Modal, {
  Footer: ModalFooter,
});
