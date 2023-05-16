import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import LayoutOption from "../components/LayoutOption";
import { ModalNames, useModalContext } from "./ModalContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputError from "components/InputError";

const schema = yup
  .object({
    layoutType: yup.string().label("Layout Type").required(),
    image: yup.string().label("Image").required(),
    title: yup.string().label("Title").required(),
    text: yup.string().label("Text").required(),
  })
  .required();
const ModalAddImageTextBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddImageTextBlock];
  }, [activeModal]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onBack = () => {
    closeAll();
    showModal(ModalNames.ModalAddNewBlock);
  };

  const onValid = () => {
    console.log("aa");
  };

  const onSubmit = () => {
    handleSubmit(onValid, (e) => console.log(e))();
  };

  return (
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Image & Text Block" showBackButton={true} footer={<Modal.Footer onSubmit={onSubmit}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex flex-col gap-4">
          <Label>Select a Layout</Label>
          <div className="flex gap-5">
            <Controller
              control={control}
              render={({ field }) => {
                return <LayoutOption name="layout" onChange={() => field.onChange("rtl")} />;
              }}
              name={"layoutType"}
            />
            <Controller
              control={control}
              render={({ field }) => {
                return <LayoutOption name="layout" onChange={() => field.onChange("ltr")} reverse={true} />;
              }}
              name={"layoutType"}
            />
          </div>
          {errors.layoutType?.message && <InputError error={errors.layoutType?.message} />}
        </div>
        <div className="flex flex-col gap-2">
          <Label helperText="800x640px recommended. PNG, GIF or JPEG. Max 20mb.">Image*</Label>
          <Controller
            control={control}
            render={({ field }) => {
              return <UploadFile value={field.value} onChange={(value: any) => field.onChange(value)} error={errors.image?.message} />;
            }}
            name={"image"}
          />
        </div>
        <InputLabel {...register("title")} error={errors.title?.message} label="Title*" />
        <div className="flex flex-col gap-2">
          <Label>Text*</Label>
          <Textarea {...register("text")} error={errors.text?.message} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddImageTextBlock;
