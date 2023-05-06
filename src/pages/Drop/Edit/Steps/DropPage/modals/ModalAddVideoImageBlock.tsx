import React from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";

const ModalAddSingleVideoBlock = (props: any) => {
  return (
    <Modal {...props} title="Add Single Video Block" showBackButton={true} footer={<Modal.Footer onClose={props.onClose}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="MP4 format supported. Max 50mb.">Video*</Label>
        <UploadFile />
      </div>
    </Modal>
  );
};

export default ModalAddSingleVideoBlock;
