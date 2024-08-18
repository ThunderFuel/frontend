import React from "react";
import { IconDiscord, IconSocial3Dots, IconX, IconGithub } from "icons";
import { DISCORD_URL } from "global-constants";

const SocialMediaIcons = () => {
  return (
    <ul className="flex gap-3 text-gray-light items-center">
      <a href="https://medium.com/@ThunderbyFuel/" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconSocial3Dots />
      </a>
      <a href="https://twitter.com/ThunderbyFuel" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconX />
      </a>
      <a href="#" target="_blank" rel="noreferrer" className="hover:text-white">
        <IconGithub />
      </a>
      <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-white">
        <IconDiscord />
      </a>
    </ul>
  );
};

export default SocialMediaIcons;
