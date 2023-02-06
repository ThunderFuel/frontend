import React from "react";
import Sidebar from "./components/Sidebar";
import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";
import ModalSocial from "./Modal/ModalSocial";
import { Outlet } from "react-router-dom";
import Tab from "./components/Tab";
import { useAppSelector } from "store";

const Profile = () => {
  const { user } = useAppSelector((state) => state.wallet);

  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [] } as any);
  const [filter, setFilter] = React.useState([] as any);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);
  const fetchUserProfile = async () => {
    const [response, responseFilter] = await Promise.all([
      userService.getUser({
        id: 16,
        includes: [0, 1, 2, 3, 4],
      }),
      userService.getFilters({ userId: user.id }),
    ]);
    setUserInfo(response.data);
    setFilter(responseFilter.data.filters ?? []);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar userInfo={userInfo} openFollows={() => setSocialActiveTab(1)} openFollowers={() => setSocialActiveTab(0)} />
      <div className="flex flex-col flex-1">
        <Tab />
        <Outlet context={[userInfo, filter]} />
      </div>
      <ModalSocial show={socialActiveTab !== null} initialTab={socialActiveTab} onClose={() => setSocialActiveTab(null)} followers={userInfo.followers} follows={userInfo.follows} />
    </div>
  );
};

export default Profile;
