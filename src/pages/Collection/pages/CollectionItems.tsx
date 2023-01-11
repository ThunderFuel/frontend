import React from "react";
import SideBar from "./components/SidebarFilter/SidebarFilter";
import CollectionList from "./components/CollectionList";

const CollectionItems = () => {
  return (
    <>
      <SideBar />
      <CollectionList />
    </>
  );
};

export default CollectionItems;
