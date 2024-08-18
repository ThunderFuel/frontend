import React from "react";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import { openInNewTab } from "utils";
import { AssetCreatorCreator1, AssetCreatorCreator2, AssetCreatorCreator3, AssetCreatorCreator4 } from "../../assets";

const FORM_URL = "https://forms.gle/d9sYqvXaF2PoHNvc7";
const CREATOR_IMAGE = [AssetCreatorCreator1, AssetCreatorCreator2, AssetCreatorCreator3, AssetCreatorCreator4];
const Creator = () => {
  return (
    <div className="container-fluid flex flex-col gap-10 mt-10 lg:mt-28">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
        <div className="flex flex-col gap-5 text-white">
          <h2 className="text-h2">Are you a creator?</h2>
          <div className="text-bodyMd max-w-[560px]">Empowering creators! Thunder prioritizes to help creators by providing assistance in technical support, networking and community building.</div>
        </div>
        <div>
          <Button className="text-nowrap" onClick={() => openInNewTab(FORM_URL)}>
            apply now <IconArrowRight className="w-[18px] h-[18px]" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CREATOR_IMAGE.map((image, index) => (
          <div key={`creator_image_${index}`}>
            <img src={image} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creator;
