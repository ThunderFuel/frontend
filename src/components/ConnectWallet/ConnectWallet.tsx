import React from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import { IconLightning, IconWallet } from "icons";
import { useWallet } from "hooks/useWallet";

const ConnectWallet = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { walletConnect } = useWallet();

  const footer = (
    <div className="flex flex-col items-center p-5 gap-y-5">
      <Button className="w-full" onClick={() => walletConnect()}>
        CONNECT <IconLightning />
      </Button>
      <div className="text-bodyMd font-spaceGrotesk text-gray-light">
        First time setting up a wallet?{" "}
        <span className="text-white underline underline-offset-2 cursor-pointer" onClick={() => console.log("TODO: redirect")}>
          Read more
        </span>
      </div>
    </div>
  );

  return (
    <Modal className="checkout" title={"Connect Wallet"} footer={footer} onClose={onClose} show={show}>
      <div className="flex m-5 text-white">
        <div className="flex p-5 gap-x-[15px] bg-gray rounded-md">
          <IconWallet />
          <div className="flex flex-col gap-y-[5px] w-full font-spaceGrotesk">
            <h6 className="text-head6 text-white">Connect your wallet!</h6>
            <span className="text-bodyMd text-gray-light"> Wallets store your crypto assets and allows you to transfer, receive and display digital assets like NFTs and cryptocoins.</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWallet;
