import React from "react";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../router/config/paths";

const Footer = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="pt-2.5 lg:pt-0">
      <Button
        className="btn-secondary btn-sm w-full"
        onClick={() => {
          navigate(PATHS.RANKINGS);
        }}
      >
        view all <IconArrowRight />
      </Button>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;
