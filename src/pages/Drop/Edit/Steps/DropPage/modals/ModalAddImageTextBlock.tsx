import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import LayoutOption from "../components/LayoutOption";
import { ModalNames, useModalContext } from "./ModalContext";

const ModalAddImageTextBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddImageTextBlock];
  }, [activeModal]);
  const onBack = () => {
    closeAll();
    showModal(ModalNames.ModalAddNewBlock);
  };

  return (
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Image & Text Block" showBackButton={true} footer={<Modal.Footer onClose={closeAll}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex flex-col gap-4">
          <Label>Select a Layout</Label>
          <div className="flex gap-5">
            <LayoutOption name="layout" />
            <LayoutOption name="layout" reverse={true} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label helperText="800x640px recommended. PNG, GIF or JPEG. Max 20mb.">Image*</Label>
          <UploadFile />
        </div>
        <InputLabel label="Title*" />
        <div className="flex flex-col gap-2">
          <Label>Text*</Label>
          <Textarea />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddImageTextBlock;
