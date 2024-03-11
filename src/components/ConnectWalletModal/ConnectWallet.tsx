import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconFuelWallet, IconFuelet, IconLightning, IconSpinner } from "icons";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";
import { useDispatch } from "react-redux";
import { useFuelet } from "hooks/useFuelet";
import { toggleWalletModal } from "store/walletSlice";

export const ConnectWallet = () => {
  const { walletConnectFuelet, walletConnectFuel } = useWallet();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuel, fuelError, fuelLoading] = useFuel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuelet, fueletError, fueletLoading] = useFuelet();

  return (
    <div className="flex flex-col h-full p-5 gap-y-5">
      <div className="flex flex-col gap-y-2.5">
        <div className="flex items-center px-2.5 py-4 justify-between bg-bg-light border border-gray rounded-[5px] group">
          <div className="flex items-center gap-x-2.5">
            <IconFuelWallet />
            <h6 className="text-head6 font-spaceGrotesk text-white">Fuel Wallet</h6>
          </div>
          {fuelLoading ? (
            <div className="flex-center h-[43px]">
              <IconSpinner className="animate-[spin_3s_linear_infinite]" />
            </div>
          ) : fuelError === "" && fuel ? (
            <Button
              className="btn-sm opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 text-bg-light"
              onClick={() => walletConnectFuel().then((res) => res ?? dispatch(toggleWalletModal()))}
            >
              CONNECT <IconArrowRight className="w-[18px] h-[18px]" />
            </Button>
          ) : (
            // <span className="text-h6 text-gray-light flex-center animate-pulse white">Temporarily Unavailable</span>
            <a href="https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok" target="_blank" rel="noreferrer">
              <Button className="btn-sm btn-secondary no-bg">
                INSTALL <IconArrowRight className="w-[18px] h-[18px]" />
              </Button>
            </a>
          )}
        </div>

        <div className={`flex px-2.5 py-4 justify-between bg-bg-light border border-gray rounded-[5px] group`}>
          <div className="flex items-center gap-x-2.5">
            <IconFuelet className="w-8 h-8" />
            <h6 className="text-head6 font-spaceGrotesk text-white">Fuelet</h6>
          </div>
          {fueletLoading ? (
            <div className="flex-center h-[43px]">
              <IconSpinner className="animate-[spin_3s_linear_infinite]" />
            </div>
          ) : fueletError === "" && fuelet ? (
            <Button
              className="btn-sm opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 text-bg-light"
              onClick={() => {
                walletConnectFuelet().then((res) => {
                  if (res) {
                    dispatch(toggleWalletModal());
                  }
                });
              }}
            >
              CONNECT <IconArrowRight className="w-[18px] h-[18px]" />
            </Button>
          ) : (
            <span className="text-h6 text-gray-light flex-center animate-pulse">Temporarily Unavailable</span>
            // <a href="https://chrome.google.com/webstore/detail/fuelet-wallet/bifidjkcdpgfnlbcjpdkdcnbiooooblg" target="_blank" rel="noreferrer">
            //   <Button className="btn-sm btn-secondary no-bg">
            //     INSTALL <IconArrowRight className="w-[18px] h-[18px]" />
            //   </Button>
            // </a>
          )}
        </div>
      </div>
      <div className="flex p-[15px] gap-x-[15px] bg-gray border border-gray rounded-md mt-auto">
        <IconLightning className="text-white w-5 h-5" />
        <div className="flex flex-col gap-y-[5px]">
          <h6 className="text-head6 font-spaceGrotesk text-white">New to Fuel?</h6>
          <p className="text-bodyMd font-spaceGrotesk text-gray-light">Fuel is the fastest execution layer for the modular blockchain stack.</p>
          <a className="text-bodyMd font-spaceGrotesk text-white underline" href="https://www.fuel.network/" target="_blank" rel="noreferrer">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};
