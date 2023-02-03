import React from "react";
import { AssetSettingsCoverImage, AssetSettingsProfileImage } from "assets";
import Input from "../../../components/Input";
import { IconInfo } from "../../../icons";

const Profile = () => {
  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <div className="overflow-hidden rounded-md">
        <img src={AssetSettingsCoverImage} />
      </div>
      <div>
        <img src={AssetSettingsProfileImage} />
      </div>
      <div>
        <label className="text-h6 text-white">Display Name</label>
        <Input value="xerocool" />
      </div>
      <div>
        <label className="text-h6 text-white">Bio</label>
        <Input placeholder="Tell about yourself!" />
      </div>
      <div>
        <label className="text-h6 text-white">Email</label>
        <span className="flex items-center body-small text-gray-light">
          <IconInfo className="w-4 h-4" />
          Your e-mail address for notifications.
        </span>
        <Input placeholder="Tell about yourself!" />
      </div>
    </div>
  );
};

export default Profile;
