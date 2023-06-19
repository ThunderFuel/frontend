import React, { useState } from "react";

import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Socials from "./components/Socials";
import CoverImage from "./components/CoverImage";
import ProfileImage from "./components/ProfileImage";
import { EventSettingsSubmit } from "../../Settings";
import { useAppDispatch, useAppSelector } from "store";
import { getDefaultAvatarSrc } from "components/Avatar/Avatar";
import userService from "api/user/user.service";
import { setUser } from "store/walletSlice";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.wallet);
  const [userInfo, setUserInfo] = useState(user as any);

  const onChange = (field: string, value: any) => {
    setUserInfo((prevState: any) => ({ ...prevState, ...{ [field]: value } }));
  };
  const onChangeCoverImage = async (imageUrl: string) => {
    setUserInfo((value: any) => ({
      ...value,
      banner: imageUrl,
    }));
  };
  const onChangeProfileImage = async (imageUrl: string) => {
    setUserInfo((value: any) => ({
      ...value,
      image: imageUrl,
    }));
  };

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
        walletAddress: user.walletAddress,
        banner: userInfo.banner ?? null,
        image: userInfo.image ?? null,
        socialMedias: userInfo.socialMedias ?? [],
      };
      const response = await userService.userUpdate(data);
      dispatch(setUser(response.data));
      navigate(PATHS.PROFILE);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    window.addEventListener(EventSettingsSubmit, onSubmit);

    return () => {
      window.removeEventListener(EventSettingsSubmit, onSubmit);
    };
  }, [userInfo]);

  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <CoverImage src={userInfo.banner} onChange={onChangeCoverImage} />
      <ProfileImage src={userInfo.image ?? getDefaultAvatarSrc(userInfo.id)} onChange={onChangeProfileImage} />
      <Input label="Display Name" value={userInfo.userName} onChange={(e: any) => onChange("userName", e.target.value)} />
      <Textarea label="Bio" placeholder="Tell about yourself!" value={userInfo.bio} onChange={(e: any) => onChange("bio", e.target.value)} />
      <Input label="Email" helperText="Your e-mail address for notifications." value={userInfo.email} onChange={(e: any) => onChange("email", e.target.value)} />
      <Socials value={userInfo.socialMedias ?? []} onChange={(value: any) => onChange("socialMedias", value)} />
    </div>
  );
};

export default Profile;
