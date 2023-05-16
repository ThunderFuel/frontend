import React, { useMemo } from "react";
import Modal from "./Modal";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import { ModalNames, useModalContext } from "./ModalContext";

const ModalAddInfinityScrollGalleryBlock = () => {
  const { activeModal, closeAll, showModal } = useModalContext();
  const imageItems = new Array(12).fill(0);
  const isShow = useMemo(() => {
    return !!activeModal[ModalNames.ModalAddInfinityScrollGalleryBlock];
  }, [activeModal]);
  const onBack = () => {
    closeAll();
    showModal(ModalNames.ModalAddNewBlock);
  };

  return (
    <Modal show={isShow} onClose={closeAll} showBackButton={true} onBack={onBack} title="Add Infinite Scroll Gallery Block" footer={<Modal.Footer onClose={closeAll}>Add Block</Modal.Footer>}>
      <div className="flex flex-col gap-2">
        <Label className="text-white" helperText="Add at least 6 NFTs from your collection. 320x320px recommended. PNG, GIF or JPEG. Max 20mb.">
          Gallery*
        </Label>
        <div className="grid grid-cols-6 gap-2">
          {imageItems.map((o, i) => {
            return <UploadFile className="min-h-[111px]" key={i} />;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddInfinityScrollGalleryBlock;
