import React from "react";
import Button from "components/Button";
import { IconArrowRight } from "icons";

const Footer = React.memo(() => {
  return (
    <Button className="btn-secondary btn-sm w-full">
      view all <IconArrowRight />
    </Button>
  );
});

Footer.displayName = "Footer";

export default Footer;
