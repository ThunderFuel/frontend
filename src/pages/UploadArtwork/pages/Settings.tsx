/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { EventWizardSubmit, useWizard } from "components/Wizard/WizardContext";
import { IconWeblink } from "icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LabelWithToggle from "components/LabelWithToggle";
import Input from "components/Input";

const schema = yup
  .object({
    artworkTitle: yup.string().required(),
    description: yup.string(),
    artworkUpload: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { onNextStep } = useWizard();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onValid = (data: any) => {
    console.log(data);
    onNextStep();
  };
  const onHandleSubmit = () => {
    handleSubmit(onValid, (e) => console.log(e))();
  };

  React.useEffect(() => {
    window.addEventListener(EventWizardSubmit, onHandleSubmit);

    return () => window.removeEventListener(EventWizardSubmit, onHandleSubmit);
  });

  const InputFieldUnlockable = <Input placeHolder="Digital key, redeem code, link to a file, etc." />;

  return (
    <div className="flex flex-col gap-10 text-white max-w-[500px]">
      <div className="flex flex-col gap-4">
        <h3 className="text-h3">Additional Settings</h3>
        <div className="body-medium text-gray-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      </div>
      <div className="flex flex-col gap-6">
        <LabelWithToggle inputField={InputFieldUnlockable} helperText="Add content that can only be revealed by the owner of the item.">
          Add Unlockable Content
        </LabelWithToggle>
        <LabelWithToggle helperText="Textual traits that show up as rectangles">Add Properties</LabelWithToggle>
        <LabelWithToggle helperText="Numerical traits that show as a progress bar">Add Level</LabelWithToggle>
      </div>
    </div>
  );
};

export default Settings;
