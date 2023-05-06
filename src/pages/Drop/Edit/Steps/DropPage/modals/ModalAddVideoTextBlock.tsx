import React from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import LayoutOption from "../components/LayoutOption";

const ModalAddVideoTextBlock = (props: any) => {
  return (
    <Modal {...props} title="Add Video & Text Block" showBackButton={true} footer={<Modal.Footer onClose={props.onClose}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex flex-col gap-4">
          <Label>Select a Layout</Label>
          <div className="flex gap-5">
            <LayoutOption video={true} name="layout" />
            <LayoutOption video={true} name="layout" reverse={true} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label helperText="MP4 format supported. Max 50mb.">Video*</Label>
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

export default ModalAddVideoTextBlock;
