import React from "react";
import { useConnectUI } from "@fuels/react";
// const body = document.querySelector("body");

const ConnectWalletModal = ({ show }: { show: boolean; onClose: any }) => {
  const { connect } = useConnectUI();
  React.useEffect(() => {
    if (show) connect();

    // if (show && body) {
    //   body.style.overflow = "hidden";
    // } else if (body) {
    //   body.style.overflow = "auto";
    // }
  }, [show]);

  return null;

  // return (
  //   <Modal className="wallet" title="Connect Your Wallet" onClose={onClose} show={show}>
  //     <ConnectWallet />
  //   </Modal>
  // );
};

export default ConnectWalletModal;
