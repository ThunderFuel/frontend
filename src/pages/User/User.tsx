import React from "react";
import { Outlet, useParams } from "react-router-dom";

import Sidebar from "../Profile/components/Sidebar/Sidebar";
import ModalSocial from "../Profile/Modal/ModalSocial";

import Tab from "./components/Tab";
import { useAppSelector } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import ProfileProvider from "../Profile/ProfileContext";

const User = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.wallet);
  const { userId } = useParams();

  if (userId && user?.id === Number(userId)) {
    navigate(PATHS.PROFILE);
  }

  return (
    <ProfileProvider userId={userId} options={{ isUserPage: true }}>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Tab userId={userId} />
          <Outlet />
        </div>
        <ModalSocial />
      </div>
    </ProfileProvider>
  );
};

export default User;
