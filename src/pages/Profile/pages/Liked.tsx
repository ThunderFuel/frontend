import React from "react";
import { useOutletContext } from "react-router-dom";
import CollectionList from "../components/CollectionList";

const options = {
  hiddenSidebar: true,
  hiddenSweep: true,
  hiddenFilter: true,
};
const Liked = () => {
  const [userInfo, filter]: any = useOutletContext();

  return <CollectionList collectionItems={userInfo.likedTokens} filterItems={filter} options={options} onChangeFilter={console.log} />;
};

export default Liked;
