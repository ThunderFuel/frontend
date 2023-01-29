import React from "react";
import Sidebar from "./components/Sidebar";
import Tab from "components/Tab";
import CollectionList from "components/CollectionList";
import { IUserResponse } from "../../api/user/user.type";
import userService from "../../api/user/user.service";

const options = {
  hiddenFilter: true,
  hiddenSweep: true,
};
const Profile = () => {
  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [] } as any);
  const fetchUserProfile = async () => {
    const response = await userService.getUser({ id: 16, includes: [0, 1, 2, 3, 4] });
    setUserInfo(response.data);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar userInfo={userInfo} />
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
        <div>
          <CollectionList collectionItems={userInfo.tokens} filterItems={[]} options={options} onChangeFilter={console.log} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
