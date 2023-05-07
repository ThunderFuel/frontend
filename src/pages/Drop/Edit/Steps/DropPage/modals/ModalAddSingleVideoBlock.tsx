import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { ModalNames, useModalContext } from "./ModalContext";
import { uploadFile } from "utils";

const ModalAddSingleVideoBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddSingleVideoBlock];
  }, [activeModal]);
  const onBack = () => {
    closeAll();
    showModal(ModalNames.ModalAddNewBlock);
  };

  const onChange = async (e: any) => {
    await uploadFile(e.target.files[0]);
  };

  return (
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Single Video Block" showBackButton={true} footer={<Modal.Footer onClose={closeAll}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="MP4 format supported. Max 50mb.">Video*</Label>
        <UploadFile onChange={onChange} />
      </div>
    </Modal>
  );
};

export default ModalAddSingleVideoBlock;
