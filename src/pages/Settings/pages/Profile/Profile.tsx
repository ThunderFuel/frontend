import React from "react";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Socials from "./components/Socials";
import { IconWeblink } from "../../../../icons";
import CoverImage from "./components/CoverImage";
import ProfileImage from "./components/ProfileImage";

const Profile = () => {
  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <CoverImage />
      <ProfileImage />
      <Input label="Display Name" value={"xerocool"} />
      <Textarea label="Bio" placeholder="Tell about yourself!"></Textarea>
      <Input label="Email" helperText="Your e-mail address for notifications." />
      <Socials />
      <Input label="Website" placeholder="yourwebsite.io" icon={<IconWeblink className="text-gray-light" />} />
    </div>
  );
};

export default Profile;
