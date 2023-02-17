import React from "react";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconPencil } from "icons";
import { EventSettingsSubmit } from "../Settings";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const Footer = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    window.dispatchEvent(new CustomEvent(EventSettingsSubmit));
  };

  const onCancel = () => {
    navigate(PATHS.PROFILE);
  };

  return (
    <div className="sticky bottom-0 bg-bg px-32 border-t border-gray">
      <div className="flex border-x border-gray">
        <div className="w-[320px] border-r border-gray" />
        <div className="flex px-10 py-5 gap-2.5">
          <Button className="" onClick={onSubmit}>
            SAVE CHANGES <IconPencil />
          </Button>
          <Button className="btn-secondary" onClick={onCancel}>
            CANCEL <IconCircleRemoveWhite />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
