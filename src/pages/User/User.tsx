import React from "react";
import { Outlet, useParams } from "react-router-dom";

import Sidebar from "../Profile/components/Sidebar";
import ModalSocial from "../Profile/Modal/ModalSocial";

import Tab from "./components/Tab";

import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";

const User = () => {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [] } as any);
  const [filter, setFilter] = React.useState([] as any);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);
  const fetchUserProfile = async () => {
    const [response, responseFilter] = await Promise.all([
      userService.getUser({
        id: userId,
        includes: [0, 1, 2, 3, 4],
      }),
      userService.getFilters({ userId: userId }),
    ]);
    setUserInfo(response.data);
    setFilter(responseFilter.data.filters ?? []);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="flex">
      <Sidebar userInfo={userInfo} openFollows={() => setSocialActiveTab(1)} openFollowers={() => setSocialActiveTab(0)} />
      <div className="flex flex-col flex-1">
        <Tab userId={userId} />
        <Outlet context={[userInfo, filter]} />
      </div>
      <ModalSocial show={socialActiveTab !== null} initialTab={socialActiveTab} onClose={() => setSocialActiveTab(null)} followers={userInfo.followers} follows={userInfo.follows} />
    </div>
  );
};

export default User;
