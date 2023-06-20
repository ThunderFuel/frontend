import React from "react";
import Img from "components/Img";
import { AssetNotFound } from "assets";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const NotFound = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(PATHS.MARKETPLACE);
  };

  return (
    <div className="flex flex-col text-white">
      <div className="w-full max-w-[1118px] m-auto">
        <div className="border-x border-gray py-16 px-10 flex items-center justify-between" style={{ minHeight: "calc(100vh - 104px)" }}>
          <div className="w-[480px]">
            <h2 className="text-h2 text-white">{"We've lost this page!"}</h2>
            <div className="body-medium text-gray-light mt-4">We searched everywhere but couldn’t find the page you’re looking for. Let’s find you a better place for you to go.</div>
            <div className="mt-12">
              <Button className="btn-primary" onClick={onClick}>
                Back to home
                <IconArrowRight />
              </Button>
            </div>
          </div>
          <Img src={AssetNotFound} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
