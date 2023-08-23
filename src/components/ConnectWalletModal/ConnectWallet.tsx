import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconContract, IconFuelet, IconFuelWallet, IconLightning } from "icons";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";
import { useDispatch } from "react-redux";
import { useFuelet } from "hooks/useFuelet";
import { toggleWalletModal } from "store/walletSlice";
import { useMetamask } from "hooks/useMetamask";
import config from "config";
import { FUEL_TYPE } from "../../hooks/useFuelExtension";

const WalletList = {
  [FUEL_TYPE.FUEL]: {
    name: "Fuel",
    icon: IconFuelWallet,
  },
  [FUEL_TYPE.FUELET]: {
    name: "Fuelet",
    icon: IconFuelet,
  },
  [FUEL_TYPE.WAGMI]: {
    name: "Metamask",
    icon: IconContract,
  },
};

const ConnectWalletButton = ({ name, icon, type }: { name: string; icon: any; type: FUEL_TYPE }) => {
  const { walletConnectGateway } = useWallet();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuel, fuelError, fuelLoading] = useFuel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuelet, fueletError, fueletLoading] = useFuelet();
  const [metamaskError] = useMetamask();
  const Icon = icon ?? IconFuelet;

  const activeWallet = {
    [FUEL_TYPE.FUEL]: { error: fuelError },
    [FUEL_TYPE.FUELET]: { error: fueletError },
    [FUEL_TYPE.WAGMI]: { error: metamaskError },
  }[type as FUEL_TYPE];

  return (
    <div className={`flex px-2.5 py-4 h-[77px] justify-between bg-bg-light border border-gray rounded-[5px] group`}>
      <div className="flex items-center gap-x-2.5">
        <Icon className="w-8 h-8" />
        <h6 className="text-head6 font-spaceGrotesk text-white">{name}</h6>
      </div>
      {activeWallet.error === "" ? (
        <Button
          className="btn-sm opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 text-bg-light"
          onClick={() => {
            walletConnectGateway(type).then((res) => {
              if (res) {
                dispatch(toggleWalletModal());
              }
            });
          }}
        >
          CONNECT <IconArrowRight className="w-[18px] h-[18px]" />
        </Button>
      ) : (
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noreferrer">
          <Button className="btn-sm btn-secondary no-bg">
            INSTALL <IconArrowRight className="w-[18px] h-[18px]" />
          </Button>
        </a>
      )}
    </div>
  );
};

export const ConnectWallet = () => {
  const walletList = config.getConfig("walletList");

  return (
    <div className="flex flex-col h-full p-5 gap-y-5">
      <div className="flex flex-col gap-y-2.5">
        {walletList.map((item: FUEL_TYPE) => {
          const wallet = WalletList[item] as any;

          return <ConnectWalletButton key={item} name={wallet.name} icon={wallet.icon} type={item} />;
        })}
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
