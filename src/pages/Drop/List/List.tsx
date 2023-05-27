import React, { useEffect, useState } from "react";
import Tab from "components/Tab";
import dropService from "api/drop/drop.service";
import Item from "./Item";

enum Type {
  Minting_Now,
  Minting_Soon,
  Minted_Out,
}

const List = () => {
  const [items, setItems] = useState<any>([]);
  const onTabChange = (e: any) => {
    console.log(e);
  };
  const getDrops = async () => {
    const response = await dropService.getDrops();
    setItems(response);
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
            <Tab initTab={Type.Minting_Now} className="secondary" onChange={onTabChange}>
              <Tab.Item id={Type.Minting_Now}>Mint Now</Tab.Item>
              <Tab.Item id={Type.Minting_Soon}>Mint Soon</Tab.Item>
              <Tab.Item id={Type.Minted_Out}>Mint Out</Tab.Item>
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
      </div>
    </div>
  );
};

export default List;
