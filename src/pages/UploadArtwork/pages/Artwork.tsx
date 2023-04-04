import { yupResolver } from "@hookform/resolvers/yup";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { EventWizardSubmit, useWizard } from "components/Wizard/WizardContext";
import { IconWeblink } from "icons";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    artworkTitle: yup.string().required(),
    description: yup.string(),
    artworkUpload: yup.string().required(),
  })
  .required();

const Artwork = () => {
  const { onNextStep } = useWizard();
  const {
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

  return (
    <div className="flex flex-col gap-10 text-white max-w-[500px]">
      <div className="flex flex-col gap-4">
        <h3 className="text-h3">Artwork</h3>
        <div className="body-medium text-gray-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      </div>
      <div className="flex flex-col gap-6">
        <Label helperText="PNG, GIF, WEBP, MP4 or MP3. Max 100mb.">Upload Your Artwork*</Label>
        <UploadFile {...register("artworkUpload")} error={errors.artworkUpload?.message} />
        <InputLabel label={"Artwork Title*"} {...register("artworkTitle")} error={errors.artworkTitle?.message} />
        <InputLabel label={"Description"} placeholder="Tell me your artwork!" containerClassName="lg:h-[140px]" {...register("description")} error={errors.description?.message} />
        <InputLabel label={"External URL"} icon={<IconWeblink className="text-gray-light" />} />
      </div>
    </div>
  );
};

export default Artwork;
