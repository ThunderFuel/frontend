import React from "react";
import { IconThunder2, IconThunderSmall } from "../../icons";

const Footer = () => {
  const links = [
    {
      name: "marketplace",
      children: [
        { name: "Explore", link: "#" },
        { name: "Collections", link: "#" },
        { name: "Drops", link: "#" },
      ],
    },
    {
      name: "account",
      children: [
        { name: "My Profile", link: "#" },
        { name: "Offers", link: "#" },
        { name: "Like", link: "#" },
        { name: "Activity", link: "#" },
        { name: "Settings", link: "#" },
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
        { name: "Discord", link: "#" },
        { name: "X(Twitter)", link: "#" },
        { name: "Medium", link: "#" },
      ],
    },
  ];

  return (
    <div className="container-fluid flex flex-col lg:flex-row justify-between gap-10">
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
                    <a href={child.link} key={`${item.name}_${child.name}`} className="body-medium">
                      {child.name}
                    </a>
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
