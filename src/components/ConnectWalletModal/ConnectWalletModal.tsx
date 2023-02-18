import React from "react";
import Modal from "components/Modal";
import { ConnectWallet } from "./ConnectWallet";

const ConnectWalletModal = ({ show, onClose }: { show: boolean; onClose: any }) => {
  return (
    <Modal className="wallet" title="Connect your Wallet" onClose={onClose} show={show}>
      <ConnectWallet onClose={onClose} />
    </Modal>
  );
};

export default ConnectWalletModal;
