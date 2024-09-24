import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ModalSocial from "./Modal/ModalSocial";
import { Outlet } from "react-router-dom";
import Tab from "./components/Tab";
import ProfileProvider from "./ProfileContext";
import { useAppSelector } from "store";
import ConnectWalletScreen from "components/ConnectWalletScreen";
import ModalBulkListing from "./Modal/ModalBulkListing";

const Profile = () => {
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  if (!isConnected) {
    return <ConnectWalletScreen />;
  }

  return (
    <ProfileProvider userId={user?.id ?? 16} options={{ isProfile: true, isUserPage: true }}>
      <div className="flex flex-col lg:flex-row">
        <Sidebar isProfile={true} />
        <div className="flex flex-col flex-1">
          <Tab />
          <Outlet />
        </div>
        <ModalSocial />
        <ModalBulkListing />
      </div>
    </ProfileProvider>
  );
};

export default Profile;
