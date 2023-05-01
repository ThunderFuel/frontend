import React from "react";
import ModalBase from "./ModalBase";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import InputSwitch from "components/InputSwitch";
import { IconCircleLeft } from "../../../../../../icons";

const ModalTitle = ({ onClose }: any) => {
  return (
    <div className="flex items-center gap-2.5">
      <button className="flex justify-center items-center w-6 h-6 bg-bg-light rounded-full" onClick={onClose}>
        <IconCircleLeft />
      </button>
      Add Milestone
    </div>
  );
};
const ModalAddMilestone = (props: any) => {
  return (
    <ModalBase {...props} title={<ModalTitle />} footer={<ModalBase.Footer onClose={props.onClose}>ADD MILESTONE</ModalBase.Footer>}>
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
    </ModalBase>
  );
};

export default ModalAddMilestone;
