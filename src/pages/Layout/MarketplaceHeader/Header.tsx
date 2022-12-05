import React, { ChangeEvent, useState } from "react";
import { AssetThunderText, AssetMockNFT } from "assets";
import "./Header.css";
import { IconHamburger, IconSearch, IconShoppingCart, IconThunder, IconWallet } from "icons";
import Tab from "components/Tab";
import HeaderButton from "components/HeaderButton";
import Search from "components/Search";
import { Link } from "react-router-dom";

const mocksearchData = {
  collections: [
    { id: "1", name: "Bored Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "2", name: "Ape Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "3", name: "Mutant Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "4", name: "Thunder Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "5", name: "Fuel Labs Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
  ],
  accounts: [
    { id: "6", name: "ApeR", image: AssetMockNFT },
    { id: "7", name: "Ape4Life", image: AssetMockNFT },
    { id: "8", name: "ApeDad", image: AssetMockNFT },
    { id: "9", name: "0xNFT", image: AssetMockNFT },
    { id: "10", name: "0xtrayder", image: AssetMockNFT },
  ],
};

const Header: React.FC = () => {
  const [data, setData] = useState<data>({
    foundCollections: mocksearchData.collections,
    foundAccounts: mocksearchData.accounts,
  });

  interface data {
    foundCollections: collection[];
    foundAccounts: account[];
  }

  interface collection {
    id: string;
    name: string;
    image: string;
    itemCount: string;
  }

  interface account {
    id: string;
    name: string;
    image: string;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.trim().replace(/" "/g, "");

    const foundCollections = mocksearchData.collections.filter((item: collection) => {
      return item.name.toLowerCase().search(searchText) !== -1;
    });
    const foundAccounts = mocksearchData.accounts.filter((item: account) => {
      return item.name.toLowerCase().search(searchText) !== -1;
    });
    setData({ foundCollections: foundCollections, foundAccounts: foundAccounts });
  };

  return (
    <header className="border-y border-gray">
      <div className="container headerPadding flex items-center justify-between ">
        <div className="flex items-center">
          <Link className="flex text-white" to="/">
            <IconThunder />
            <img className="hidden lg:flex ml-[4px]" src={AssetThunderText} />
          </Link>
          <div className="">
            <Search onChange={onChange} data={data}></Search>
          </div>
          <div className="hidden lg:flex ml-5">
            <Tab initTab={1}>
              <Tab.Item id={1}>EXPLORE</Tab.Item>
              <Tab.Item id={2}>COLLECTIONS</Tab.Item>
              <Tab.Item id={3}>CREATE</Tab.Item>
            </Tab>
          </div>
        </div>
        <div className="flex">
          <HeaderButton className="border-l border-gray lg:hidden">
            <IconSearch />
          </HeaderButton>
          <HeaderButton className="hidden header-btn border-l border-gray lg:flex">
            <IconWallet />
          </HeaderButton>
          <HeaderButton className="header-btn border-x border-gray  ">
            <IconShoppingCart />
          </HeaderButton>
          <HeaderButton className="header-btn lg:hidden">
            <IconHamburger />
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
