import React, { useState } from "react";

import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Socials from "./components/Socials";
import CoverImage from "./components/CoverImage";
import ProfileImage from "./components/ProfileImage";
import { EventSettingsSubmit } from "../../Settings";
import { useAppSelector } from "store";
import { getDefaultAvatarSrc } from "components/Avatar/Avatar";
import userService from "api/user/user.service";

const Profile = () => {
  const { user } = useAppSelector((state) => state.wallet);
  const [userInfo, setUserInfo] = useState(user);

  const onChange = (field: string, value: any) => {
    setUserInfo((prevState: any) => {
      console.log({ ...prevState, ...{ [field]: value } });

      return { ...prevState, ...{ [field]: value } };
    });
  };

  React.useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = {
          id: user.id,
          bio: userInfo.bio,
          userName: userInfo.userName,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          gender: userInfo.gender,
          contractAddress: user.contractAddress,
          banner: userInfo.banner ?? null,
          image: userInfo.image ?? null,
          socialMedias: userInfo.socialMedias ?? [],
        };
        await userService.createUser(data);
      } catch (e) {
        console.log(e);
      }
    };

    window.addEventListener(EventSettingsSubmit, onSubmit);

    return () => {
      window.removeEventListener(EventSettingsSubmit, onSubmit);
    };
  }, []);

  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <CoverImage src={userInfo.banner} />
      <ProfileImage src={userInfo.image ?? getDefaultAvatarSrc(userInfo.id)} />
      <Input label="Display Name" value={userInfo.userName} onChange={(e: any) => onChange("userName", e.target.value)} />
      <Textarea label="Bio" placeholder="Tell about yourself!" value={userInfo.bio} onChange={(e: any) => onChange("bio", e.target.value)} />
      <Input label="Email" helperText="Your e-mail address for notifications." value={userInfo.email} onChange={(e: any) => onChange("email", e.target.value)} />
      <Socials value={userInfo.socialMedias ?? []} onChange={(value: any) => onChange("socialMedias", value)} />
    </div>
  );
};

export default Profile;
