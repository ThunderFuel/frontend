import React from "react";
import Modal from "components/Modal";
import { ConnectWallet } from "./ConnectWallet";
const body = document.querySelector("body");

const ConnectWalletModal = ({ show, onClose }: { show: boolean; onClose: any }) => {
  React.useEffect(() => {
    if (show && body) {
      body.style.overflow = "hidden";
    } else if (body) {
      body.style.overflow = "auto";
    }
  }, [show]);

  return (
    <Modal className="wallet" title="Connect" onClose={onClose} show={show}>
      <ConnectWallet />
    </Modal>
  );
};

export default ConnectWalletModal;
