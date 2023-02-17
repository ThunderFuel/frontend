import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ModalSocial from "./Modal/ModalSocial";
import { Outlet, useNavigate } from "react-router-dom";
import Tab from "./components/Tab";
import ProfileProvider from "./ProfileContext";
import { useAppSelector } from "store";
import { PATHS } from "router/config/paths";

const Profile = () => {
  const { user } = useAppSelector((state) => state.wallet);

  //*
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user.id) {
      navigate(PATHS.MARKETPLACE);
    }
  }, []);
  //*/

  return (
    <ProfileProvider userId={user.id ?? 16} options={{ isProfile: true }}>
      <div className="flex">
        <Sidebar isProfile={true} />
        <div className="flex flex-col flex-1">
          <Tab />
          <Outlet />
        </div>
        <ModalSocial />
      </div>
    </ProfileProvider>
  );
};

export default Profile;
