import React from "react";
import { useAppSelector } from "store";
import ButtonBase from "components/Button";
import { IconPencil, IconPlus } from "icons";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import clsx from "clsx";
import { useProfile } from "../../../ProfileContext";

const Button = ({ children, className, ...etc }: any) => {
  return (
    <ButtonBase className={clsx("absolute top-5 right-5 z-10 no-bg btn-sm text-headline-02", className)} {...etc}>
      {children}
    </ButtonBase>
  );
};

const ButtonFollow = () => {
  const { userInfo, onFollow } = useProfile();
  const { user } = useAppSelector((state) => state.wallet) as any;
  const isFollow = !!userInfo?.followers?.find((follower: any) => follower.userId === user?.id);

  const [hoverText, setHoverText] = React.useState("FOLLOWING");

  const onSetFollow = () => {
    onFollow({ followUser: user, isFollow });
  };

  if (!user?.id) {
    return <></>;
  }

  if (isFollow) {
    return (
      <Button
        className="text-white border-white hover:border-red hover:text-red hover:bg-red/20"
        onClick={onSetFollow}
        onMouseEnter={() => setHoverText("UNFOLLOW")}
        onMouseLeave={() => setHoverText("FOLLOWING")}
      >
        {hoverText}
      </Button>
    );
  }

  return (
    <Button className="text-white border-white" onClick={onSetFollow}>
      FOLLOW <IconPlus />
    </Button>
  );
};

const ButtonEdit = () => {
  const navigate = useNavigate();

  return (
    <Button className="text-white" onClick={() => navigate(PATHS.SETTINGS_PROFILE)}>
      EDIT YOUR PROFILE <IconPencil />
    </Button>
  );
};

export { ButtonEdit, ButtonFollow };
