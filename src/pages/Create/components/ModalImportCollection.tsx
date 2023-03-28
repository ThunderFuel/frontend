import React, { useMemo } from "react";
import Input from "components/Input";
import { IconDone, IconInfo } from "icons";
import Button from "components/Button";
import Modal from "components/Modal";

const ModalImportCollection = ({ onClose, show }: { onClose: any; show: boolean }) => {
  const [isImported, setIsImported] = React.useState(false);

  const footer = useMemo(
    () => (
      <div className="flex flex-col justify-center items-center gap-2 p-5">
        {!isImported ? (
          <Button className="btn-disabled w-full" onClick={() => setIsImported(true)}>
            IMPORT COLLECTION
          </Button>
        ) : (
          <Button className="w-full">GO TO COLLECTION</Button>
        )}
        <Button className="btn-secondary w-full" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    ),
    [isImported]
  );

  return (
    <Modal onClose={onClose} className="checkout" title="Import Collection" show={show} footer={footer}>
      <div className="flex flex-col p-5 w-full gap-2">
        {!isImported ? (
          <>
            <h6 className="text-head6 font-spaceGrotesk text-white">Contract Address</h6>
            <div className="flex items-center text-bodySm text-gray-light gap-[5px]">
              <IconInfo width="17px" className="shrink-0" /> Please make sure that wallet you connected is the contract owner
            </div>
            <Input onChange={(event: React.ChangeEvent<HTMLSelectElement>) => console.log(event)} value={""} type="text" maxLength={66} />
          </>
        ) : (
          <div className="flex items-center gap-x-[22px]">
            {<IconDone className="text-white" />}
            <div className="flex flex-col text-gray-light gap-2">
              <h5 className="text-head5 font-spaceGrotesk text-white">Your collection succesfully imported!</h5>
              <span className="text-bodyMd font-spaceGrotesk">You can now edit your collection page.</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalImportCollection;
