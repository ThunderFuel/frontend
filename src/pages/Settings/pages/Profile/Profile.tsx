import React from "react";
import Textarea from "./components/Textarea";
// import Socials from "./components/Socials";
import CoverImage from "./components/CoverImage";
import ProfileImage from "./components/ProfileImage";
import { EventSettingsSubmit } from "../../Settings";
import { useAppDispatch, useAppSelector } from "store";
import { getDefaultAvatarSrc } from "components/Avatar/Avatar";
import useNavigate from "hooks/useNavigate";
import yup from "schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userService from "api/user/user.service";
import { setUser } from "store/walletSlice";
import { PATHS } from "router/config/paths";
import InputLabel from "components/InputLabel";

const MAX_LENGTH = 126;
const schema = yup
  .object({
    userName: yup.string(),
    email: yup.string().email("This field is must be email"),
    bio: yup.string().max(MAX_LENGTH, "Max character limit is exceeded"),
    banner: yup.string(),
    image: yup.string(),
  })
  .required();

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.wallet);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: any) => {
    try {
      const data = {
        id: user.id,
        bio: formData.bio,
        userName: formData.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: formData.email,
        phone: user.phone,
        gender: user.gender,
        walletAddress: user.walletAddress,
        banner: formData.banner ?? null,
        image: formData.image ?? null,
        socialMedias: user.socialMedias ?? [],
      };
      const response = await userService.userUpdate(data as any);
      dispatch(setUser(response.data));
      navigate(PATHS.PROFILE);
    } catch (e) {
      console.log(e);
    }
  };
  const formSubmit = () => {
    handleSubmit(onSubmit, console.log)();
  };

  React.useEffect(() => {
    reset({
      userName: user.userName ?? "",
      email: user.email ?? "",
      bio: user.bio ?? "",
      banner: user.banner ?? "",
      image: user.image ?? getDefaultAvatarSrc(user.id),
    });
    window.addEventListener(EventSettingsSubmit, formSubmit);

    return () => {
      window.removeEventListener(EventSettingsSubmit, formSubmit);
    };
  }, [user]);

  return (
    <div className="flex flex-col gap-10 p-10 w-[500px]">
      <Controller control={control} name="image" render={({ field: { onChange, value } }) => <ProfileImage src={value} onChange={onChange} />} />
      <Controller control={control} name="banner" render={({ field: { onChange, value } }) => <CoverImage src={value} onChange={onChange} />} />
      <InputLabel labelClassName="text-white" label="Display Name" {...register("userName")} error={errors.userName?.message} />
      <Textarea label="Bio" placeholder="Tell about yourself!" {...register("bio")} maxLength={MAX_LENGTH} error={errors.bio?.message} length={watch("bio")?.length ?? 0} />
      <InputLabel labelClassName="text-white" label="Email" {...register("email")} helperText="Your e-mail address for notifications." error={errors.email?.message} />
      {/* <Socials value={userInfo.socialMedias ?? []} onChange={(value: any) => onChange("socialMedias", value)} /> */}
    </div>
  );
};

export default Profile;
