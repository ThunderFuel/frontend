import Button from "components/Button";
import Modal from "components/Modal";
import { IconEthereum, IconWarning } from "icons";
import React, { Dispatch, SetStateAction } from "react";

export interface InsufficentFundsProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
const InsufficentFunds = ({ showModal, setShowModal }: InsufficentFundsProps) => {
  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full py-2 px-5 justify-between border-b border-gray ">
        <span className="text-head6 font-spaceGrotesk text-gray-light">Your Balance</span>
        <span className="flex items-center text-head6 font-spaceGrotesk text-white">
          1.2 <IconEthereum color="#838383" />
        </span>
      </div>
      <div className="flex flex-col w-full gap-y-[10px] p-5">
        <Button>ADD FUNDS</Button>
        <Button className="btn-secondary">CLOSE</Button>
      </div>
    </div>
  );

  return (
    <>
      {showModal ? (
        <Modal className="checkout" title="Insufficent Funds" setshowModal={setShowModal} footer={footer}>
          <div className="flex justify-center gap-x-5 py-8 px-6 border-y border-gray ">
            <div className="flex mt-[2px]">
              <IconWarning fill="red" />
            </div>
            <div className="flex flex-col">
              <h5 className="text-head5 font-spaceGrotesk text-white">
                You need <span className="text-head6 font-spaceGrotesk text-red">4.2 ETH + gas fees.</span>
              </h5>
              <span className="text-bodyMd font-spaceGrotesk text-gray-light">
                Transfer funds to your wallet or add funds with a card. It can take up to a minute for your balance to
                update.
              </span>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default InsufficentFunds;
