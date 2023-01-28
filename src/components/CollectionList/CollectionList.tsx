import React from "react";
import Filter from "./components/Filter";
import SideBar from "./components/Sidebar/SidebarFilter";
import List from "./components/List";
import CollectionListProvider from "./CollectionListContext";

const CollectionList = (props: any) => {
  return (
    <CollectionListProvider value={props}>
      <Filter />
      <div className="container-fluid flex">
        <SideBar />
        <List />
      </div>
    </CollectionListProvider>
  );
};

export default CollectionList;
