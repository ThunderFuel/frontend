import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { AssetThunderText } from "assets";
import { IconCart, IconEthereum, IconGas, IconHamburger, IconSearch, IconThunder, IconWallet } from "icons";

import Tab from "components/Tab";
import SocialMediaIcons from "components/SocialMediaIcons";

import Search from "./components/Search";

import "./Header.css";
import { useAppDispatch } from "store";
import { onToggle } from "store/mobileSearchSlice";
import MobileSearch from "./components/MobileSearch";

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

const HeaderIconButtonGroup = React.memo(() => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex divide-x divide-gray border-l border-l-gray lg:border-l-0 lg:border-r lg:border-gray">
      <HeaderIconButton className="lg:hidden" onClick={() => dispatch(onToggle())}>
        <IconSearch />
      </HeaderIconButton>
      <HeaderIconButton className="hidden lg:flex">
        <IconWallet height="30px" width="30px" />
      </HeaderIconButton>
      <HeaderIconButton onClick={() => console.log(true)}>
        <IconCart height="30px" width="30px" />
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
