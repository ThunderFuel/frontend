import React from "react";
import { useAppSelector } from "store";
import ButtonBase from "components/Button";
import { IconPencil, IconPlus } from "icons";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import clsx from "clsx";
import userService from "api/user/user.service";

const Button = ({ children, className, ...etc }: any) => {
  return (
    <ButtonBase className={clsx("absolute top-5 right-5 z-10 no-bg btn-sm text-headline-02", className)} {...etc}>
      {children}
    </ButtonBase>
  );
};

const ButtonFollow = ({ userInfo, onChangeFollowers }: any) => {
  const { user } = useAppSelector((state) => state.wallet) as any;
  const isFollow = !!userInfo.follows?.find((follower: any) => follower.userId === user?.id);
  const [hoverText, setHoverText] = React.useState("FOLLOWING");

  if (!user?.id) {
    return <></>;
  }

  const onFollow = async () => {
    try {
      const response = await userService.followUser({
        followId: userInfo.id,
        followerId: user.id,
        follow: !isFollow,
      });
      if (response.data) {
        onChangeFollowers();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isFollow) {
    return (
      <Button
        className="text-white border-white hover:border-red hover:text-red hover:bg-red/20"
        onClick={onFollow}
        onMouseEnter={() => setHoverText("UNFOLLOW")}
        onMouseLeave={() => setHoverText("FOLLOWING")}
      >
        {hoverText}
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
