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
    image: yup.string().required(),
  })
  .required();
const ModalAddSingleImageBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddSingleImageBlock];
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

  const onValid = (data: any) => {
    console.log(data, "aa");
  };
  const onSubmit = () => {
    handleSubmit(onValid, (e) => console.log(e))();
  };

  return (
    <Modal show={isShow} onBack={onBack} onClose={closeAll} title="Add Single Image Block" showBackButton={true} footer={<Modal.Footer onSubmit={onSubmit}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2 text-white">
        <Label helperText="800x640px recommended. PNG, GIF or JPEG. Max 20mb.">Image*</Label>
        <UploadFile {...register("image")} error={errors.image?.message} />
      </div>
    </Modal>
  );
};

export default ModalAddSingleImageBlock;
