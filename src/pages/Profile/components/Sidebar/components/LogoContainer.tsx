import React from "react";
import { IconCirclePlus } from "icons";
import Avatar from "components/Avatar";
import SocialButtons from "./SocialButtons";
import { addressFormat, openInNewTab, clipboardCopy } from "utils";
import { useAppSelector } from "store";
import { useClickOutside } from "hooks/useClickOutside";
import clsx from "clsx";
import useToast from "hooks/useToast";

const WalletDropdown = ({ walletAddress }: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const items = [
    {
      text: "Copy Address",
      onClick: () => {
        clipboardCopy(walletAddress);
        useToast().success("Copied to clipboard.");
        setShow(false);
      },
    },
    {
      text: "See on Block Explorer",
      onClick: () => {
        openInNewTab(`https://fuellabs.github.io/block-explorer-v2/address/${walletAddress}`);
        setShow(false);
      },
    },
  ];
  useClickOutside(containerRef, () => {
    setShow(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      <div className={clsx("cursor-pointer border border-gray rounded-[4px] p-2 hover:text-white", show && "bg-bg-light text-white")} onClick={() => setShow(!show)}>
        <span className="body-medium">{addressFormat(walletAddress)}</span>
      </div>
      {show ? (
        <ul className="absolute top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] divide-y divide-gray overflow-hidden">
          {items.map((item, k) => {
            return (
              <li key={k} onClick={item.onClick} className="cursor-pointer">
                <span className="flex body-medium whitespace-nowrap px-4 py-3 hover:text-white hover:bg-bg-light">{item.text}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

const LogoContainer = ({ userInfo }: any) => {
  const { user } = useAppSelector((state) => state.wallet) as any;
  const isFollowers = userInfo?.follows?.find((follower: any) => follower.userId === user?.id);

  const walletAddress = addressFormat(userInfo?.walletAddress);

  return (
    <div className="flex gap-5 w-full">
      <Avatar image={userInfo?.image} userId={user?.id} className="w-[84px] h-[84px]" />
      <div className="flex flex-col gap-2.5 flex-1 text-gray-light">
        <div className="flex items-center gap-2">
          <h3 className="text-h3 text-white">{userInfo?.userName ?? walletAddress}</h3>
          {isFollowers ? (
            <div className="flex items-center gap-2">
              <IconCirclePlus className="" />
              <div className="text-headline-01">FOLLOWS YOU</div>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2">
          <WalletDropdown walletAddress={userInfo?.walletAddress} />
          <SocialButtons socialMedias={userInfo?.socialMedias ?? []} />
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;
