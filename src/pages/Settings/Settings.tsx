import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export const EventSettingsSubmit = "EventSettingsSubmit";
const Settings = () => {
  return (
    <div className="flex flex-col">
      <div className="p-5 lg:py-0 lg:px-32 lg:border-b lg:border-gray">
        <div className="lg:border-x lg:border-gray lg:py-16 lg:px-10">
          <h2 className="text-h2 text-white">Settings</h2>
        </div>
      </div>
      <div className="lg:px-32">
        <div className="flex flex-col lg:flex-row lg:border-x lg:border-gray lg:h-full">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
