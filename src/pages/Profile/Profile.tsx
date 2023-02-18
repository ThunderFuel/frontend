import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ModalSocial from "./Modal/ModalSocial";
import { Outlet } from "react-router-dom";
import Tab from "./components/Tab";
import ProfileProvider from "./ProfileContext";
import { useAppSelector } from "store";
import ConnectWalletScreen from "components/ConnectWalletScreen";

const Profile = () => {
  const { user } = useAppSelector((state) => state.wallet);

  return user.id ? (
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
  ) : (
    <ConnectWalletScreen />
  );
};

export default Profile;
