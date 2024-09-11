import React from "react";
import { IconArrowRight } from "icons";
import Button from "components/Button";
import { AssetConnectAWalletScreen1 } from "assets";
import "./connectwalletscreen.css";

const ConnectWalletScreen = () => {
  return (
    <div className="flex-center flex-1">
      <div className="flex flex-col lg:flex-row w-full justify-between pt-[60px] px-4 lg:border-x lg:border-gray lg:pl-10 pb-10 lg:mx-40">
        <div className="flex flex-col w-full lg:max-w-[560px] gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h2 text-white">Connect a wallet</h2>
            <p className="body-medium text-gray-light break-words">Looks like you`re not connected to a wallet. In order to use Thunder marketplace you should sign in with your wallet.</p>
          </div>
          <Button className="btn btn-primary w-1/2 lg:w-full">
            Connect <IconArrowRight />
          </Button>
        </div>

        <img src={AssetConnectAWalletScreen1} className="max-w-[440px] max-h-[440px]" />
      </div>
    </div>
  );
};

export default ConnectWalletScreen;
