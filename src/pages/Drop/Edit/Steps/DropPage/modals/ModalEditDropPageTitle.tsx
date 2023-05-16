import React from "react";
import Modal from "./Modal";
import InputLabel from "components/InputLabel";

const ModalEditDropPageTitle = (props: any) => {
  const { onClose, ...etc } = props;

  return (
    <Modal title="Edit Drop Page Title" {...etc} footer={<Modal.Footer onClose={onClose} />}>
      <div className="text-white">
        <InputLabel label="Enter Title*" />
      </div>
    </Modal>
  );
};

export default ModalEditDropPageTitle;
