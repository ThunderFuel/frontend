import React, { useState } from "react";
import userService from "api/user/user.service";

import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Socials from "./components/Socials";
import CoverImage from "./components/CoverImage";
import ProfileImage from "./components/ProfileImage";
import { EventSettingsSubmit } from "../../Settings";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({} as any);
  const fetchUserProfile = async () => {
    const response = await userService.getUser({
      id: 16,
      includes: [0],
    });
    setUserInfo(response.data);
  };

  const onSubmit = async () => {
    try {
      const data = {
        id: userInfo.id,
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        gender: userInfo.gender,
        contractAddress: userInfo.contractAddress,
        banner: userInfo.banner,
        image: userInfo.image,
        socialMedias: userInfo.socialMedias,
      };

      await userService.createUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (field: string, value: any) => {
    setUserInfo((prevState: any) => {
      return { ...prevState, ...{ [field]: value } };
    });
  };

  React.useEffect(() => {
    fetchUserProfile();

    window.addEventListener(EventSettingsSubmit, onSubmit);

    return () => {
      window.removeEventListener(EventSettingsSubmit, onSubmit);
    };
  }, []);

  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <CoverImage src={userInfo.banner} />
      <ProfileImage src={userInfo.image} />
      <Input label="Display Name" value={userInfo.userName} onChange={(e: any) => onChange("userName", e.target.value)} />
      <Textarea label="Bio" placeholder="Tell about yourself!" value={userInfo.description} onChange={(e: any) => onChange("description", e.target.value)} />
      <Input label="Email" helperText="Your e-mail address for notifications." value={userInfo.email} onChange={(e: any) => onChange("email", e.target.value)} />
      <Socials value={userInfo.socialMedias ?? []} onChange={(value: any) => onChange("socialMedias", value)} />
    </div>
  );
};

export default Profile;
