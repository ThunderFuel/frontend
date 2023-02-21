import { ConnectWallet } from "components/ConnectWalletModal/ConnectWallet";
import React from "react";
import "./connectwalletscreen.css";

const ConnectWalletScreen = () => {
  return (
    <div className="flex flex-col">
      <div className="border-x border-gray pt-[60px] pl-10 pb-10 mx-40">
        <div className="flex flex-col max-w-[560px] gap-y-[15px]">
          <h2 className="text-head2 font-spaceGrotesk text-white">Connect a wallet</h2>
          <p className="text-bodyMd font-spaceGrotesk text-gray-light break-words">
            Looks like you`re not connected to a wallet. In order to use Thunder marketplace you should sign in with your wallet.
          </p>
        </div>
      </div>
      <div className="border-t border-gray"></div>
      <div className="flex h-full border-x border-gray pt-5 pl-5 mx-40 ">
        <div className="max-w-[560px] h-full">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletScreen;
