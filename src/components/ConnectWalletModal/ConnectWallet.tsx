import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconCoinbase, IconFuelWallet, IconFuelet, IconLightning, IconMetamask, IconWalletConnect } from "icons";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";
import { useDispatch } from "react-redux";
import { useFuelet } from "hooks/useFuelet";
import { toggleWalletModal } from "store/walletSlice";
import { useMetamask } from "hooks/useMetamask";
import { useCoinbase } from "hooks/useCoinbase";
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
  [FUEL_TYPE.WAGMI_METAMASK]: {
    name: "Metamask",
    icon: IconMetamask,
  },
  [FUEL_TYPE.WAGMI_COINBASE]: {
    name: "Coinbase",
    icon: IconCoinbase,
  },
  [FUEL_TYPE.WAGMI_WALLETCONNECT]: {
    name: "WalletConnect",
    icon: IconWalletConnect,
  },
};

const ConnectWalletButton = ({ name, icon, type, activeConnector }: { name: string; icon: any; type: FUEL_TYPE; activeConnector: number }) => {
  const { walletConnectGateway } = useWallet();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuel, fuelError, fuelLoading] = useFuel();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuelet, fueletError, fueletLoading] = useFuelet();
  const [metamaskError] = useMetamask();
  const [coinbaseError] = useCoinbase();
  const Icon = icon ?? IconFuelet;

  const activeWallet = {
    [FUEL_TYPE.FUEL]: { error: fuelError },
    [FUEL_TYPE.FUELET]: { error: fueletError },
    [FUEL_TYPE.WAGMI_METAMASK]: { error: metamaskError },
    [FUEL_TYPE.WAGMI_WALLETCONNECT]: { error: metamaskError },
    [FUEL_TYPE.WAGMI_COINBASE]: { error: coinbaseError },
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
            walletConnectGateway(type, activeConnector).then((res: any) => {
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
        {walletList.map((item: FUEL_TYPE, activeIndex: number) => {
          const wallet = WalletList[item] as any;

          return <ConnectWalletButton key={item} name={wallet.name} icon={wallet.icon} type={item} activeConnector={activeIndex} />;
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
