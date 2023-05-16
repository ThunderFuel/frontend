import React from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import InputSwitch from "components/InputSwitch";

const ModalAddMilestone = (props: any) => {
  return (
    <Modal {...props} title="Add Milestone" showBackButton={true} footer={<Modal.Footer onClose={props.onClose}>ADD MILESTONE</Modal.Footer>}>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex flex-col gap-2">
          <Label helperText="400x200px recommended. PNG, GIF or JPEG. Max 20mb.">Image</Label>
          <UploadFile />
        </div>
        <InputLabel label="Title*"></InputLabel>
        <div className="flex flex-col gap-2">
          <Label>Description*</Label>
          <Textarea></Textarea>
        </div>
        <div className="flex justify-between">
          <Label helperText="Choose this option if the milestone has been accomplished.">Milestone is completed</Label>
          <InputSwitch />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddMilestone;
