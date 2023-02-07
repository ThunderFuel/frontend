import React from "react";
import { useAppSelector } from "store";
import ButtonBase from "components/Button";
import { IconPencil, IconPlus } from "icons";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import clsx from "clsx";
import userService from "api/user/user.service";
import { IFollowRequest } from "../../../../../api/user/user.type";

const Button = ({ children, className, ...etc }: any) => {
  return (
    <ButtonBase className={clsx("absolute top-5 right-5 z-10 no-bg btn-sm text-headline-02", className)} {...etc}>
      {children}
    </ButtonBase>
  );
};

const ButtonFollow = ({ userInfo, onChangeUserInfo }: any) => {
  console.log("ButtonFollow", JSON.stringify(userInfo));

  const { user } = useAppSelector((state) => state.wallet) as any;
  const isFollower = userInfo.followers?.find((follower: any) => follower.userId === user?.id);
  const onFollow = async () => {
    try {
      const data = {
        followId: userInfo.id,
        followerId: user.id,
        follow: true,
      } as IFollowRequest;
      if (isFollower) {
        data.follow = false;
      }

      await userService.followUser(data);

      if (data.follow) {
        userInfo.followers.push({
          firstName: user.firstName,
          followerCount: user?.followers?.length,
          lastName: user.lastName,
          userId: user.id,
          userName: user.userName,
        });
      } else {
        const findIndex = userInfo.followers.findIndex((follower: any) => follower.userId === user.id);
        if (findIndex > -1) {
          userInfo.followers.splice(findIndex, 1);
        }
      }
      onChangeUserInfo(userInfo);
    } catch (e) {
      console.log(e);
    }
  };

  if (isFollower) {
    return (
      <Button className="text-white border-white" onClick={onFollow}>
        FOLLOWING
      </Button>
    );
  }

  return (
    <Button className="text-white border-white" onClick={onFollow}>
      FOLLOW <IconPlus />
    </Button>
  );
};

const ButtonEdit = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(PATHS.SETTINGS_PROFILE)}>
      EDIT YOUR PROFILE <IconPencil />
    </Button>
  );
};

export { ButtonEdit, ButtonFollow };
