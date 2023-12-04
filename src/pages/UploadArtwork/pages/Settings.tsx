/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { EventWizardSubmit, useWizard } from "components/Wizard/WizardContext";
import { IconTrash, IconWeblink } from "icons";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import LabelWithToggle from "components/LabelWithToggle";
import Input from "components/Input";
import SocialButtons from "pages/Collection/components/SocialButtons";

const schema = yup
  .object({
    unlockable: yup.string(),
    // propertiesName: yup.string().required(),
    // propertiesType: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { onNextStep } = useWizard();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    fields: propertyFields,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    name: "",
  });

  const {
    fields: levelFields,
    append: appendLevel,
    remove: removeLevel,
  } = useFieldArray({
    name: "levels",
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

  const InputFieldUnlockable = <Input {...register("unlockable")} placeHolder="Digital key, redeem code, link to a file, etc." />;

  const InputFieldProperties = (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {propertyFields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <Input placeHolder="Name" />
              <Input placeHolder="Type" />
              <div
                className="flex p-3 border border-gray rounded cursor-pointer"
                onClick={() => {
                  removeProperty(index);
                }}
              >
                <IconTrash className="text-gray-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <span
          className="body-medium text-white rounded-md p-2.5 bg-gray cursor-pointer"
          onClick={() => {
            appendProperty({ name: "", type: "" });
          }}
        >
          Add More
        </span>
      </div>
    </div>
  );

  const InputFieldLevels = (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {levelFields.map((field, index) => (
            <div className="flex items-center gap-2" key={field.id}>
              <Input placeHolder="Type" />
              <Input defaultValue="1" />
              <span className="text-headlineMd text-gray-light font-bigShoulderDisplay">OF</span>
              <Input defaultValue="100" />
              <div
                className="flex p-3 border border-gray rounded cursor-pointer"
                onClick={() => {
                  removeLevel(index);
                }}
              >
                <IconTrash className="text-gray-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <span
          className="body-medium text-white rounded-md p-2.5 bg-gray cursor-pointer"
          onClick={() => {
            appendLevel({ name: "", type: "" });
          }}
        >
          Add More
        </span>
      </div>
    </div>
  );

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
        <LabelWithToggle inputField={InputFieldProperties} helperText="Textual traits that show up as rectangles.">
          Add Properties
        </LabelWithToggle>
        <LabelWithToggle inputField={InputFieldLevels} helperText="Numerical traits that show as a progress bar.">
          Add Level
        </LabelWithToggle>
      </div>
    </div>
  );
};

export default Settings;
