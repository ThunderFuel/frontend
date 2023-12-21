import React from "react";
import Button from "components/Button";
import { IconArrowRight, IconCoinbase, IconDiscord, IconFuelWallet, IconFuelet, IconGoogle, IconLightning, IconMetamask, IconWallet, IconWalletConnect } from "icons";
import { useWallet } from "hooks/useWallet";
import { useFuel } from "hooks/useFuel";
import { useDispatch } from "react-redux";
import { useFuelet } from "hooks/useFuelet";
import { toggleWalletModal } from "store/walletSlice";
import { useMetamask } from "hooks/useMetamask";
import { useCoinbase } from "hooks/useCoinbase";
import config from "config";
import { FUEL_TYPE } from "../../hooks/useFuelExtension";
import { signInWithDiscord, signInWithGoogle } from "lit-protocol/lit";
import clsx from "clsx";
import Input from "components/Input";

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
  [FUEL_TYPE.LIT_GOOGLE_AUTH]: {
    name: "Google",
    icon: IconGoogle,
  },
  [FUEL_TYPE.LIT_DISCORD_AUTH]: {
    name: "Discord",
    icon: IconDiscord,
  },
};

const SocialList = [
  {
    name: "Google",
    icon: IconGoogle,
  },
  {
    name: "Discord",
    icon: IconDiscord,
  },
];

const SocialButton = ({ name, icon }: any) => {
  const Icon = icon;

  return (
    <Button
      className="btn-secondary px-4 h-[60px] w-full rounded"
      onClick={() => {
        if (name == "Google") signInWithGoogle("http://localhost:3000/marketplace");
        else if (name == "Discord") signInWithDiscord("http://localhost:3000/marketplace");
        else return;
      }}
    >
      <Icon className={clsx("w-[30px] h-[30px]", name === "Google" ? "h-[22.5px] w-[22.5px]" : name === "Discord" ? "text-[#738ADB]" : "")} />
    </Button>
  );
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
    [FUEL_TYPE.LIT_GOOGLE_AUTH]: { error: metamaskError },
    [FUEL_TYPE.LIT_DISCORD_AUTH]: { error: metamaskError },
  }[type as FUEL_TYPE];

  return (
    <div className={`flex p-2.5 h-[60px] items-center justify-between border border-gray rounded-[5px] group`}>
      <div className="flex items-center gap-x-2.5">
        <Icon className={clsx("w-8 h-8", name === "Google" ? "h-[22.5px] w-[22.5px]" : name === "Discord" ? "text-[#738ADB]" : "")} />
        <h6 className="text-head6 font-spaceGrotesk text-white">{name}</h6>
      </div>
      {activeWallet.error === "" ? (
        <Button
          className="btn-sm h-10 opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 text-bg-light"
          onClick={() => {
            if (name == "Google") signInWithGoogle("http://localhost:3000/marketplace");
            else if (name == "Discord") signInWithDiscord("http://localhost:3000/marketplace");
            else
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
        <a href={name === "Metamask" ? "https://metamask.io/download/" : name === "Coinbase" ? "https://coinbase.com/wallet/downloads" : ""} target="_blank" rel="noreferrer">
          <Button className="btn-secondary btn-sm no-bg h-10">
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
    <div className="flex flex-col h-full p-5 gap-[15px] overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[5px]">
          <h5 className="text-head5 font-spaceGrotesk text-white">Login/Sign up</h5>
          <span className="text-bodyMd text-gray-light font-spaceGrotesk">Choose a way to get you started quickly</span>
        </div>
        <div className="flex flex-col gap-2.5 border border-gray rounded-lg p-[15px]">
          <div className="flex items-center h-fit gap-6 border border-gray rounded-lg p-2.5">
            <Input placeholder="Enter your e-mail address" containerClassName="!h-10 border-none !p-0" />
            <Button className="btn-primary h-10 btn-sm whitespace-nowrap">get started</Button>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-[1px] bg-gray w-full"></div>
            <span className="whitespace-nowrap text-headline-01 !tracking-[2.4px] uppercase font-bigShoulderDisplay text-gray-light">or start with socials</span>
            <div className="h-[1px] bg-gray w-full"></div>
          </div>
          <div className="flex gap-2.5">
            {SocialList.map((item: any, index: number) => (
              <SocialButton key={index} name={item.name} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray w-full flex-shrink-0" />

      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[5px]">
          <h5 className="text-head5 font-spaceGrotesk text-white">Connect your wallet</h5>
          <span className="text-bodyMd text-gray-light font-spaceGrotesk">Use your existing wallet to login</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {walletList.map((item: FUEL_TYPE, activeIndex: number) => {
            const wallet = WalletList[item] as any;

            if (item === FUEL_TYPE.LIT_GOOGLE_AUTH || item === FUEL_TYPE.LIT_DISCORD_AUTH) return <></>;

            return <ConnectWalletButton key={item} name={wallet.name} icon={wallet.icon} type={item} activeConnector={activeIndex} />;
          })}
        </div>
      </div>

      {config.getConfig("type") === "fuel" ? (
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
      ) : (
        <></>
      )}
      <div className="mt-auto">
        <span className="text-bodyMd text-gray-light">
          By connecting your wallet, you agree to our <u className="text-white cursor-pointer">Terms of Service</u> and our <u className="text-white cursor-pointer">Privacy Policy.</u>
        </span>
      </div>
    </div>
  );
};
