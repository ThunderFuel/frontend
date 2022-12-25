import React from "react";
import { AssetLogo } from "assets";
import SocialMediaIcons from "./SocialMediaIcons";

const Header: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="border-b border-gray">
      <div className="container py-5 flex justify-between items-center">
        <img src={AssetLogo} style={{ height: "32px" }} />
        {children}
        <SocialMediaIcons />
      </div>
    </header>
  );
};

export default Header;
