import React from "react";
import { IconThunder2 } from "../../icons";
import { DISCORD_URL, MEDIUM_URL, TWITTER_URL } from "../../global-constants";
import { getAbsolutePath } from "../../hooks/useNavigate";
import { PATHS } from "../../router/config/paths";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      name: "marketplace",
      children: [
        { name: "Explore", link: getAbsolutePath(PATHS.MARKETPLACE) },
        { name: "Collections", link: getAbsolutePath(PATHS.RANKINGS) },
        { name: "Drops", link: getAbsolutePath(PATHS.DROPS) },
      ],
    },
    {
      name: "account",
      children: [
        { name: "My Profile", link: getAbsolutePath(PATHS.PROFILE) },
        { name: "Offers", link: getAbsolutePath(PATHS.PROFILE_OFFER) },
        { name: "Like", link: getAbsolutePath(PATHS.PROFILE_LIKED) },
        { name: "Activity", link: getAbsolutePath(PATHS.PROFILE_ACTIVITY) },
        { name: "Settings", link: getAbsolutePath(PATHS.SETTINGS_PROFILE) },
      ],
    },
    {
      name: "resources",
      children: [
        { name: "About", link: "#" },
        { name: "Docs", link: "#" },
        { name: "Github", link: "#" },
      ],
    },
    {
      name: "socials",
      children: [
        { name: "Discord", link: DISCORD_URL },
        { name: "X(Twitter)", link: TWITTER_URL },
        { name: "Medium", link: MEDIUM_URL },
      ],
    },
  ];

  return (
    <div className="container-fluid flex flex-col lg:flex-row justify-between gap-10 mt-2.5 lg:mt-10">
      <div className="flex flex-col gap-5">
        <IconThunder2 className="w-[75px] text-white" />
        <span className="body-medium text-gray-light">Thunder is an NFT marketplace on Fuel.</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-white">
        {links.map((item) => {
          return (
            <div key={item.name} className="min-w-[200px]">
              <div className="text-headline-01 uppercase">{item.name}</div>
              <div className="flex flex-col gap-3 mt-7">
                {item.children.map((child) => {
                  return (
                    <Link to={child.link} key={`${item.name}_${child.name}`} className="body-medium">
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
