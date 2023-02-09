import React from "react";
import { Outlet, useParams } from "react-router-dom";

import Sidebar from "../Profile/components/Sidebar/Sidebar";
import ModalSocial from "../Profile/Modal/ModalSocial";

import Tab from "./components/Tab";

import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";
import { useAppSelector } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const enum FollowType {
  Followers = 0,
  Follows = 1,
}

const User = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.wallet);
  const { userId } = useParams();

  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [], followers: [] } as any);
  const [filter, setFilter] = React.useState([] as any);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);

  if (userId && user?.id === Number(userId)) {
    navigate(PATHS.PROFILE);
  }

  const fetchUserProfile = async () => {
    const [response, responseFilter] = await Promise.all([
      userService.getUser({
        id: userId,
        includes: [0, 1, 2, 3, 4],
      }),
      userService.getFilters({ userId: userId }),
    ]);
    setUserInfo(response.data);
    console.log(response.data);
    setFilter(responseFilter.data.filters ?? []);
  };

  const onChangeFollowers = async () => {
    await fetchUserProfile();
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="flex">
      <Sidebar userInfo={userInfo} openFollows={() => setSocialActiveTab(FollowType.Follows)} openFollowers={() => setSocialActiveTab(FollowType.Followers)} onChangeFollowers={onChangeFollowers} />
      <div className="flex flex-col flex-1">
        <Tab userId={userId} />
        <Outlet context={[userInfo, filter]} />
      </div>
      <ModalSocial show={socialActiveTab !== null} initialTab={socialActiveTab} onClose={() => setSocialActiveTab(null)} followers={userInfo.followers} follows={userInfo.follows} />
    </div>
  );
};

export default User;
