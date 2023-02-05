import React from "react";
import Modal from "components/Modal";
import { useAppDispatch, useAppSelector } from "store";
import { setIsBurner, setIsConnected, toggleManageFundsModal } from "store/walletSlice";
import { AssetProfileAvatar1 } from "assets";
import { IconActivity, IconArrowRight, IconFaucet, IconLike, IconLink, IconLogout, IconOffer, IconSettings, IconToken, IconWallet } from "icons";
import { Button } from "react-bootstrap";
import Balances from "components/Balances";
import { useWallet } from "hooks/useWallet";
import { addressFormat } from "utils";
import { useFuel } from "hooks/useFuel";

const Wallet = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const dispatch = useAppDispatch();
  const { user, isBurner } = useAppSelector((state) => state.wallet);
  const { walletDisconnect } = useWallet();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fuel, error, loading] = useFuel();

  const MenuItems = [
    { title: "My Profile", icon: <IconWallet />, onClick: () => console.log("My Profile") },
    { title: "Create", icon: <IconToken />, onClick: () => console.log("Create") },
    { title: "Offers", icon: <IconOffer />, onClick: () => console.log("Offers") },
    { title: "Activity", icon: <IconActivity />, onClick: () => console.log("Activity") },
    { title: "Liked", icon: <IconLike />, onClick: () => console.log("Liked") },
    { title: "Settings", icon: <IconSettings />, onClick: () => console.log("Settings") },
  ];

  const WalletMenu = React.useMemo(() => {
    return MenuItems.map((item) => (
      <div
        key={item.title}
        onClick={item.onClick}
        className="flex items-center p-5 gap-x-[25px] cursor-pointer font-spaceGrotesk text-head6 text-gray-light border-b border-gray hover:text-white hover:bg-bg-light"
      >
        {item.icon}
        {item.title}
      </div>
    ));
  }, []);

  return (
    <Modal className="cart" title="Wallet" onClose={onClose} show={show}>
      <div className="flex pl-5 pt-5 pb-[33px] gap-x-5 font-spaceGrotesk border-b border-gray">
        <img src={user?.image ?? AssetProfileAvatar1} className="w-20 h-20 rounded-full" />
        <div className="flex flex-col gap-y-[11px] justify-end">
          <h4 className="text-head4 text-green">{user?.userName}</h4>
          <div className="flex gap-x-2.5">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://fuellabs.github.io/block-explorer-v2/address/${user?.contractAddress}`}
              className="flex items-center gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light"
            >
              <IconLink className="w-[15px] h-[15px]" />
              {addressFormat(user?.contractAddress)}
            </a>
            <div
              className="flex items-center gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light"
              onClick={() => {
                if (!isBurner) walletDisconnect();
                else {
                  dispatch(setIsConnected(false));
                  dispatch(setIsBurner(false));
                }
                onClose();
              }}
            >
              <IconLogout className="w-[15px] h-[15px]" />
              Logout
            </div>
          </div>
        </div>
      </div>
      {WalletMenu}
      <div className="flex mt-auto flex-col p-5 gap-y-2.5">
        <Balances />
        <div className="flex w-full gap-x-2.5">
          <Button target="_blank" rel="noreferrer" as="a" href={`https://faucet-beta-2.fuel.network/?address=${user?.contractAddress}`} className="w-full">
            GET TEST ETH <IconFaucet />
          </Button>
          <Button disabled className="btn-secondary w-full" onClick={() => dispatch(toggleManageFundsModal())}>
            MANAGE FUNDS <IconArrowRight />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Wallet;
