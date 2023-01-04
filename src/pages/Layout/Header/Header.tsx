import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { AssetThunderText } from "assets";
import { IconHamburger, IconSearch, IconShoppingCart, IconThunder, IconWallet } from "icons";

import Tab from "components/Tab";
import SocialMediaIcons from "components/SocialMediaIcons";

import Search from "./components/Search";

import "./Header.css";
import { useAppDispatch } from "store";
import { onToggle } from "store/mobileSearchSlice";
import MobileSearch from "./components/MobileSearch";
import { useWallet } from "hooks/useWallet";
import { toggleCartModal } from "store/cartSlice";

const ethPrice = 1322.6;
const gasPrice = 39;

const HeaderTop = React.memo(() => {
  return (
    <div className="container-fluid flex py-2.5 items-center">
      <div className="flex items-center gap-5 w-full text-headline-01 uppercase text-gray-light">
        <span>
          ETH: <span className="text-white">${ethPrice}</span>
        </span>
        <span>
          GAS: <span className="text-white">{gasPrice} GWEI</span>
        </span>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
HeaderTop.displayName = "HeaderTop";

const HeaderIconButtonGroup = React.memo(() => {
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
      <HeaderIconButton onClick={() => dispatch(toggleCartModal())}>
        <IconShoppingCart />
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
    <header className="sticky top-0 bg-bg z-20">
      <HeaderTop />
      <div className="border-y border-gray">
        <div className="header-container-fluid">
          <div className="flex items-center gap-6">
            <Link className="flex text-white gap-1" to="/">
              <IconThunder className="w-14 lg:w-7" />
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
