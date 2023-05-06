import React from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";

const ModalAddSingleImageBlock = (props: any) => {
  return (
    <Modal {...props} title="Add Single Image Block" showBackButton={true} footer={<Modal.Footer onClose={props.onClose}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="800x640px recommended. PNG, GIF or JPEG. Max 20mb.">Image*</Label>
        <UploadFile />
      </div>
    </Modal>
  );
};

export default ModalAddSingleImageBlock;
