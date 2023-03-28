import React from "react";

import { AssetCollectionCoverImage1, AssetMockNFT1 } from "assets";
import Input from "pages/Settings/pages/Profile/components/Input";
import Textarea from "pages/Settings/pages/Profile/components/Textarea";
import Socials from "pages/Settings/pages/Profile/components/Socials";
import SetRoyalty from "./components/SetRoyalty";
import Footer from "pages/Settings/components/Footer";

const EditCollection = () => {
  const [isSetRoyalty, setisSetRoyalty] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-x border-gray h-full">
        <div className="px-32 border-b border-gray">
          <div className="border-x border-gray py-16 px-10">
            <h2 className="text-h2 text-white">Settings</h2>
          </div>
        </div>
        <div className="px-32">
          <div className="flex flex-col flex-1 border-x border-gray h-full p-10 gap-5">
            <img src={AssetCollectionCoverImage1} className="rounded-[10px]" />
            <div className="flex flex-col w-[500px] gap-5">
              {/* <Avatar /> */}
              <img src={AssetMockNFT1} className="h-[100px] w-[100px] rounded-[5px]" />
              <Input label="Collection Name" />
              <Textarea label="Description" helperText="Markdown sytnax is supported." />
              <Socials value={[]} />
              <SetRoyalty onToggle={() => setisSetRoyalty((prev) => !prev)} isOn={isSetRoyalty} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditCollection;
