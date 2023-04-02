/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { EventWizardSubmit, useWizard } from "components/Wizard/WizardContext";
import { IconTrash, IconWeblink } from "icons";
import { useForm } from "react-hook-form";
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

  const InputFieldUnlockable = <Input {...register("unlockable")} placeHolder="Digital key, redeem code, link to a file, etc." />;
  const InputFieldProperties = (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input {...register("propertiesName")} placeHolder="Name" />
        <Input {...register("propertiesType")} placeHolder="Type" />
        <div className="flex p-3 border border-gray rounded cursor-pointer">
          <IconTrash className="text-gray-light" />
        </div>
      </div>
      <div className="w-fit cursor-pointer bg-gray rounded p-2.5">Add More</div>
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
        <LabelWithToggle inputField={InputFieldUnlockable} helperText="Numerical traits that show as a progress bar.">
          Add Level
        </LabelWithToggle>
      </div>
    </div>
  );
};

export default Settings;

// const inputFields = useRef([{ value: "" }]);

// const handleAddFields = () => {
//   inputFields.current.push({ value: "" });
// };

// const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log("Input fields:", inputFields.current);
// };

// return (
//   <div>
//     <form onSubmit={handleSubmit}>
//       {inputFields.current.map((inputField, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             placeholder="Enter a value"
//             value={inputField.value}
//             onChange={(event) => {
//               inputFields.current[index].value = event.target.value;
//             }}
//           />
//         </div>
//       ))}
//       <button type="button" onClick={handleAddFields}>
//         Add Field
//       </button>
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// );
