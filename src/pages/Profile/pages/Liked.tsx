import React from "react";
import CollectionList from "../components/CollectionList";
import { useProfile } from "../ProfileContext";

const options = {
  hiddenSidebar: true,
  hiddenSweep: true,
  hiddenFilter: true,
  itemLabel: "LIKED ITEMS",
  hideFooter: true,
};
const Liked = () => {
  const { userInfo } = useProfile();

  return <CollectionList collectionItems={userInfo.likedTokens ?? []} filterItems={[]} options={options} onChangeFilter={console.log} />;
};

export default Liked;
