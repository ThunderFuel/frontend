import { ConnectWallet } from "components/ConnectWalletModal/ConnectWallet";
import React from "react";
import "./connectwalletscreen.css";

const ConnectWalletScreen = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="pt-[60px] px-4 lg:border-x lg:border-gray lg:pl-10 pb-10 lg:mx-40">
        <div className="flex flex-col w-full lg:max-w-[560px] gap-y-[15px]">
          <h2 className="text-h2 text-white">Connect a wallet</h2>
          <p className="body-medium text-gray-light break-words">Looks like you`re not connected to a wallet. In order to use Thunder marketplace you should sign in with your wallet.</p>
        </div>
      </div>
      <div className="border-t border-gray"></div>
      <div className="flex flex-1 h-full border-x border-gray pt-5 px-0 lg:pl-5 lg:mx-40">
        <div className="w-full lg:max-w-[560px] h-full">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletScreen;
