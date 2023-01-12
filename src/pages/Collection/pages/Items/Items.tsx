import React from "react";
import SideBar from "./components/Sidebar/SidebarFilter";
import CollectionList from "./components/List";
import Filter from "./components/Filter";

const Items = () => {
  return (
    <>
      <Filter />
      <div className="container-fluid flex">
        <SideBar />
        <CollectionList />
      </div>
    </>
  );
};

export default Items;
