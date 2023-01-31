import React from "react";
import Modal from "components/Modal";
import { useAppDispatch } from "store";
import { toggleManageFundsModal } from "store/walletSlice";
import { AssetMockNFT1 } from "assets";
import { IconActivity, IconArrowRight, IconLike, IconLink, IconOffer, IconSettings, IconToken, IconWallet } from "icons";
import { Button } from "react-bootstrap";
import Balances from "components/Balances";

const Wallet = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const dispatch = useAppDispatch();

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
        className="flex items-center p-5 gap-x-[25px] cursor-pointer font-spaceGrotesk text-head5 text-gray-light border-b border-gray hover:text-white hover:bg-bg-light"
      >
        {item.icon}
        {item.title}
      </div>
    ));
  }, []);

  return (
    <Modal className="cart" title="Wallet" onClose={onClose} show={show}>
      <div className="flex pl-5 pt-5 pb-[33px] gap-x-5 font-spaceGrotesk border-b border-gray">
        <img src={AssetMockNFT1} className="w-20 h-20 rounded-full" />
        <div className="flex flex-col gap-y-[11px]">
          <h4 className="text-head4 text-green"> xerocool</h4>
          <div className="flex items-center gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light">
            <IconLink className="w-[15px] h-[15px]" />
            {/*TODO - address format fonksiyonu ekle */}
            12x281...229193
          </div>
        </div>
      </div>
      {WalletMenu}
      <div className="flex mt-auto flex-col p-5 gap-y-2.5">
        <Balances />
        <Button className="btn-secondary" onClick={() => dispatch(toggleManageFundsModal())}>
          MANAGE FUNDS <IconArrowRight />
        </Button>
      </div>
    </Modal>
  );
};

export default Wallet;
