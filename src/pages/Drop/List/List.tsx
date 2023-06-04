import React, { useEffect, useState } from "react";
import Tab from "components/Tab";
import dropService, { DROP_STATUS } from "api/drop/drop.service";
import Item from "./Item";
import NotFound from "components/NotFound";

const List = () => {
  const [items, setItems] = useState<any>([]);
  const onTabChange = async (e: any) => {
    await getDrops({ type: e });
  };
  const getDrops = async (params = {}) => {
    const response = await dropService.getDrops(params);
    setItems(response.data);
  };

  useEffect(() => {
    getDrops();
  }, []);

  return (
    <div className="flex flex-col gap-10 py-16">
      <div className="container-fluid">
        <h2 className="text-h2 text-white">Drop</h2>
      </div>
      <div className="border-t border-b border-gray">
        <div className="container-fluid">
          <div className="flex">
            <Tab initTab={DROP_STATUS.MINT_LIVE} className="secondary" onChange={onTabChange}>
              <Tab.Item id={DROP_STATUS.MINT_LIVE}>Mint Now</Tab.Item>
              <Tab.Item id={DROP_STATUS.MINT_SOON}>Mint Soon</Tab.Item>
              <Tab.Item id={DROP_STATUS.MINT_OUT}>Mint Out</Tab.Item>
            </Tab>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
          {items.map((item: any, k: number) => (
            <Item key={k} item={item} />
          ))}
        </div>
        {!items.length && (
          <div className="flex-center">
            <NotFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
