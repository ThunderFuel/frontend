import React from "react";
import { AssetLogo } from "assets";
import SocialMediaIcons from "./SocialMediaIcons";
import { IconCart } from "icons";

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray py-5 lg:py-0">
      <div className="container-fluid flex justify-between items-center">
        <img src={AssetLogo} className="h-8" alt="logo" />
        <div className="flex items-center gap-7">
          <SocialMediaIcons />
          <div className="group hidden lg:flex h-full items-center justify-center p-[21px] border-x border-x-gray cursor-pointer">
            <IconCart className="text-gray-light opacity-30" />
            <div className="group-hover:opacity-100 transition-opacity duration-500 ease-out opacity-0 absolute top-[95px] w-28 tracking-[0.2em] text-headline-01 text-white bg-gray rounded-full text-center px-2 py-2.5">
              COMING SOON
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
