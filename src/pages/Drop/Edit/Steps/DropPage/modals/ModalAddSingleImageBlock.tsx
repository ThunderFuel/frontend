import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { ModalNames, useModalContext } from "./ModalContext";

const ModalAddSingleImageBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddSingleImageBlock];
  }, [activeModal]);
  const onBack = () => {
    closeAll();
    showModal(ModalNames.ModalAddNewBlock);
  };

  return (
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Single Image Block" showBackButton={true} footer={<Modal.Footer onClose={closeAll}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="800x640px recommended. PNG, GIF or JPEG. Max 20mb.">Image*</Label>
        <UploadFile />
      </div>
    </Modal>
  );
};

export default ModalAddSingleImageBlock;
