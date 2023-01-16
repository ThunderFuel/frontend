import React from "react";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../router/config/paths";

const Footer = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Button
      className="btn-secondary btn-sm w-full"
      onClick={() => {
        navigate(PATHS.RANKINGS);
      }}
    >
      view all <IconArrowRight />
    </Button>
  );
});

Footer.displayName = "Footer";

export default Footer;
