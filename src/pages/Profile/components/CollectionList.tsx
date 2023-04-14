import React from "react";
import Filter from "components/CollectionList/components/Filter";
import SideBar from "components/CollectionList/components/Sidebar/SidebarFilter";
import List from "components/CollectionList/components/List";
import CollectionListProvider from "components/CollectionList/CollectionListContext";

const CollectionList = (props: any) => {
  return (
    <CollectionListProvider value={props}>
      {props?.options.hiddenFilter ? null : <Filter className="px-5" />}
      <div className="flex flex-1 px-5">
        {props?.options?.hiddenSidebar ? null : <SideBar className="w-60" />}
        <List />
      </div>
    </CollectionListProvider>
  );
};

export default CollectionList;
