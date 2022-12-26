import React from "react";
import { AssetLogo } from "assets";
import SocialMediaIcons from "./SocialMediaIcons";
import { IconShoppingCart } from "icons";
import "./header.css";

const Header: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex border-b border-gray">
      <div className="flex justify-between items-center container">
        <div className=" py-5 flex w-full justify-between items-center">
          <a href="/">
            <img src={AssetLogo} style={{ height: "32px" }} />
          </a>
          {children}
          <div className="flex items-center gap-3">
            <SocialMediaIcons />
          </div>
        </div>
        <div className="hidden lg:flex h-full items-center justify-center px-[25px] ml-[23px] border-x border-x-gray">
          <IconShoppingCart fill="#353535" className="shoppingcart cursor-pointer" />
          <div className=" transition-opacity duration-500 ease-out opacity-0 absolute top-[95px] shoppingcarthoverelement w-[100px] tracking-[0.2em] font-bigShoulderDisplay text-headlineSm text-white bg-gray rounded-[100px] text-center px-2 py-[5px]">
            COMING SOON
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
