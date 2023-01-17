import React from "react";
import Sidebar from "./components/Sidebar";
import Tab from "components/Tab";

const Profile = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="border-b border-gray">
          <div className="inline-flex -my-[1px]">
            <Tab initTab={1} className="secondary">
              <Tab.Item id={1}>Owned</Tab.Item>
              <Tab.Item id={2}>Created</Tab.Item>
              <Tab.Item id={3}>Liked</Tab.Item>
              <Tab.Item id={4}>Offers</Tab.Item>
              <Tab.Item id={5}>Activity</Tab.Item>
            </Tab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
