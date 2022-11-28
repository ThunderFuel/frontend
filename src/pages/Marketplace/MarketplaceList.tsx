import React from "react";
import CollectionTable, { ICollectionTableHeader } from "./components/CollectionTable/CollectionTable";
import Filter from "./components/Filter";
import Button from "components/Button";

const MarketplaceList = () => {
  const headers: ICollectionTableHeader[] = [];
  const items: any[] = [];

  return (
    <div>
      <Filter />
      <CollectionTable
        headers={headers}
        items={items}
        footerSlot={
          <div>
            <Button className="btn-secondary btn-sm">adas</Button>
          </div>
        }
      />
    </div>
  );
};

export default MarketplaceList;
