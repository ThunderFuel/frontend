import React from "react";
import { IconDiscord, IconSocial3Dots, IconTwitter } from "../../../icons";

const SocialMediaIcons = () => {
  return (
    <ul className="flex gap-3 text-gray-light">
      <a href="https://discord.gg/thundernftmarket" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconDiscord />
      </a>
      <a href="https://twitter.com/ThunderbyFuel" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconTwitter />
      </a>
      <a href="https://medium.com/@ThunderbyFuel/" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconSocial3Dots />
      </a>
    </ul>
  );
};

export default SocialMediaIcons;
