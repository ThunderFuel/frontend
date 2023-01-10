import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { AssetThunderText } from "assets";
import { IconCart, IconEthereum, IconGas, IconHamburger, IconSearch, IconThunder2, IconWallet } from "icons";

import Tab from "components/Tab";
import SocialMediaIcons from "components/SocialMediaIcons";

import Search from "./components/Search/Search";

import "./Header.css";
import { useAppDispatch, useAppSelector } from "store";
import { onToggle } from "store/mobileSearchSlice";
import MobileSearch from "./components/Search/MobileSearch";
import { useWallet } from "hooks/useWallet";
import { toggleCartModal } from "store/cartSlice";

const ethPrice = 1322.6;
const gasPrice = 39;

const HeaderTop = React.memo(() => {
  return (
    <div className="container-fluid flex pt-[5px] pb-[9px] items-center">
      <div className="flex items-center gap-5 w-full text-headlineSm font-bigShoulderDisplay uppercase">
        <span className="flex items-center">
          <IconEthereum color="#838383" />
          <span className="text-white">${ethPrice}</span>
        </span>
        <span className="flex items-center">
          <IconGas className="mr-[6px]" />
          <span className="text-white">{gasPrice} GWEI</span>
        </span>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
HeaderTop.displayName = "HeaderTop";

const HeaderCardBadge = React.memo(({ count }: { count: number }) => {
  return (
    <span className="font-spaceGrotesk font-normal font-bold bg-white flex-center text-black absolute rounded-full w-[22px] h-[22px] -top-1 -right-1 border-[2px] border-bg tracking-normal">
      {count}
    </span>
  );
});

HeaderCardBadge.displayName = "HeaderCardBadge";

const HeaderIconButtonGroup = React.memo(() => {
  const selectedCarts = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const { walletConnect, isWalletConnected } = useWallet();

  return (
    <div className="flex divide-x divide-gray border-l border-l-gray lg:border-l-0 lg:border-r lg:border-gray">
      <HeaderIconButton className="lg:hidden" onClick={() => dispatch(onToggle())}>
        <IconSearch />
      </HeaderIconButton>
      <HeaderIconButton className="hidden lg:flex" onClick={walletConnect}>
        <IconWallet fill={isWalletConnected ? "white" : "grey"} />
      </HeaderIconButton>
      <HeaderIconButton className="relative" onClick={() => dispatch(toggleCartModal())}>
        <div className="relative">
          <IconCart height="30px" width="30px" />
          {selectedCarts.length > 0 && <HeaderCardBadge count={selectedCarts.length} />}
        </div>
      </HeaderIconButton>
      <HeaderIconButton className="lg:hidden">
        <IconHamburger />
      </HeaderIconButton>
    </div>
  );
});

HeaderIconButtonGroup.displayName = "HeaderIconButtonGroup";

const HeaderIconButton = React.memo((props: any) => {
  return (
    <button className={clsx("header-btn", props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
});
HeaderIconButton.displayName = "HeaderIconButton";

export interface HeaderProps {
  showCartModal: Dispatch<SetStateAction<boolean>>;
}

const Header = () => {
  return (
    <header className="sticky top-0 bg-bg z-30">
      <HeaderTop />
      <div className="border-y border-gray">
        <div className="header-container-fluid">
          <div className="flex items-center gap-6 pr-6">
            <Link className="flex text-white gap-1" to="/">
              <IconThunder2 className="w-14" />
              <img className="hidden lg:flex" src={AssetThunderText} alt={AssetThunderText} />
            </Link>

            <Search />

            <Tab initTab={1} className="hidden lg:flex">
              <Tab.Item id={1}>EXPLORE</Tab.Item>
              <Tab.Item id={2}>COLLECTIONS</Tab.Item>
              <Tab.Item id={3}>CREATE</Tab.Item>
            </Tab>
          </div>
          <HeaderIconButtonGroup />
        </div>
      </div>
      <MobileSearch />
    </header>
  );
};

export default Header;
