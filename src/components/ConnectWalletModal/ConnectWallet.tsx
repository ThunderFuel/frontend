import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconBurner, IconFuelet, IconLightning } from "icons";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";
import { Wallet } from "fuels";
import { useDispatch } from "react-redux";
import { setAddress, setBurnerWallet, setIsBurner, setIsConnected, setUser, toggleWalletModal } from "store/walletSlice";
import userService from "api/user/user.service";

export const ConnectWallet = ({ onClose }: { onClose?: any }) => {
  const { walletConnect } = useWallet();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuel, error, loading] = useFuel();

  function generateBurnerUser() {
    const wallet = Wallet.generate({ provider: "https://node-beta-2.fuel.network/graphql" });
    dispatch(setBurnerWallet(wallet));

    dispatch(setAddress(wallet.address.toB256()));
    userService.userCreate(wallet.address.toB256()).then((res) => dispatch(setUser(res.data)));
    dispatch(setIsBurner(true));
    dispatch(setIsConnected(true));
  }

  return (
    <div className="flex flex-col h-full p-5 gap-y-5">
      <div className="flex flex-col gap-y-2.5">
        <div className="flex items-center px-2.5 py-4 justify-between bg-bg-light border border-gray rounded-[5px] group">
          <div className="flex items-center gap-x-2.5">
            <div className="flex p-1.5 bg-gray rounded-full">
              <IconLightning className="text-[#01FFC8] w-5 h-5" />
            </div>
            <h6 className="text-head6 font-spaceGrotesk text-white">Fuel Wallet</h6>
          </div>
          {error === "" ? (
            <Button className="btn-sm opacity-0 ease-in-out transform duration-300 group-hover:opacity-100" onClick={() => walletConnect().then((res) => res ?? dispatch(toggleWalletModal()))}>
              CONNECT <IconArrowRight className="w-[18px] h-[18px]" />
            </Button>
          ) : (
            <a href="https://wallet.fuel.network/" target="_blank" rel="noreferrer">
              <Button className="btn-sm btn-secondary">
                INSTALL <IconArrowRight className="w-[18px] h-[18px]" />
              </Button>
            </a>
          )}
        </div>
        <div className={`flex px-2.5 py-4 h-[77px] justify-between bg-bg-light border border-gray rounded-[5px] group`}>
          <div className="flex items-center gap-x-2.5">
            <IconFuelet className="w-8 h-8" />
            <h6 className="text-head6 font-spaceGrotesk text-gray-light">Fuelet</h6>
          </div>
          <Button disabled className="btn-sm btn-secondary opacity-0 ease-in-out transform duration-300 group-hover:opacity-100">
            SOON
          </Button>
        </div>
        <div
          className="cursor-pointer h-[77px] flex items-center gap-x-2.5 px-2.5 py-5 bg-bg-light border border-gray rounded-[5px] hover:bg-gray"
          onClick={() => {
            generateBurnerUser();
            onClose();
          }}
        >
          <div className="flex p-1.5 bg-gray rounded-full">
            <IconBurner className="w-5 h-5" />
          </div>
          <h6 className="text-head6 font-spaceGrotesk text-white">Generate Burner Wallet</h6>
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
