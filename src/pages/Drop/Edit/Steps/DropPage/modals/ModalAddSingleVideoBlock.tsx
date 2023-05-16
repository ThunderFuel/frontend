import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { ModalNames, useModalContext } from "./ModalContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    video: yup.string().required(),
  })
  .required();

const ModalAddSingleVideoBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddSingleVideoBlock];
  }, [activeModal]);

  const {
    register,
    handleSubmit,
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
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Single Video Block" showBackButton={true} footer={<Modal.Footer onSubmit={onSubmit}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="MP4 format supported. Max 50mb.">Video*</Label>
        <UploadFile {...register("video")} error={errors.video?.message} />
      </div>
    </Modal>
  );
};

export default ModalAddSingleVideoBlock;
