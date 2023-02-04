import React from "react";
import Button from "components/Button";
import { IconPencil } from "icons";

const Footer = () => {
  return (
    <div className="sticky bottom-0 bg-bg px-32 border-t border-gray">
      <div className="flex border-x border-gray">
        <div className="w-[320px] border-r border-gray" />
        <div className="flex px-10 py-5">
          <Button className="">
            SAVE CHANGES <IconPencil />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
