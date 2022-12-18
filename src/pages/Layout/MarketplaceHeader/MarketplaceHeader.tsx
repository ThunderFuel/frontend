import React, { ChangeEvent, useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { AssetThunderText, AssetMockNFT } from "assets";
import "./MarketplaceHeader.css";
import { IconHamburger, IconSearch, IconShoppingCart, IconThunder, IconWallet } from "icons";
import Tab from "components/Tab";
import HeaderButton from "components/HeaderButton";
import { Link } from "react-router-dom";
import SocialMediaIcons from "../Header/SocialMediaIcons";
import SearchDropDown from "components/SearchDropDown";
import SearchInput from "components/SearchInput";
import MobileSearch from "components/MobileSearch";

const mocksearchData = {
  collections: [
    { id: "1", name: "Bored Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "2", name: "Ape Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "3", name: "Mutant Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "4", name: "Thunder Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
    { id: "5", name: "Fuel Labs Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
  ],
  accounts: [
    { id: "9", name: "ApeR", image: AssetMockNFT },
    { id: "10", name: "Ape4Life", image: AssetMockNFT },
    { id: "11", name: "ApeDad", image: AssetMockNFT },
    { id: "12", name: "0xNFT", image: AssetMockNFT },
    { id: "13", name: "0xtrayder", image: AssetMockNFT },
  ],
};

const ethPrice = 1322.6;
const gasPrice = 39;

export interface HeaderProps {
  showCartModal: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ showCartModal }: HeaderProps) => {
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
    const searchText = e.target.value.trim().replace(/" "/g, "").toLowerCase();

    const foundCollections = mocksearchData.collections.filter((item: collection) => {
      return item.name.toLowerCase().search(searchText) !== -1;
    });
    const foundAccounts = mocksearchData.accounts.filter((item: account) => {
      return item.name.toLowerCase().search(searchText) !== -1;
    });
    setData({ foundCollections: foundCollections, foundAccounts: foundAccounts });
  };

  const [showResults, setShowResults] = useState(false);
  const [showMobileSearchMenu, setShowMobileSearchMenu] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!e.path.includes(modalRef.current)) {
        setShowResults(false);
      }
    };

    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [modalRef.current]);

  return (
    <header className="bg-bg flex flex-col">
      <div className="container flex py-2.5 items-center">
        <div className="w-full font-bigShoulderDisplay text-headlineSm uppercase text-gray-light">
          ETH: <span className="text-white before:content-['$'] mr-[18px]">{ethPrice}</span>
          GAS: <span className="text-white after:content-['\00a0GWEI']">{gasPrice}</span>
        </div>
        <SocialMediaIcons />
      </div>
      <div className="border-y border-gray">
        <div className="container headerPadding flex items-center justify-between ">
          <div className="flex items-center">
            <Link className="flex text-white" to="/">
              <IconThunder height={"28px"} width={"58px"} />
              <img className="hidden lg:flex ml-[4px]" src={AssetThunderText} />
            </Link>
            {showMobileSearchMenu ? (
              <MobileSearch
                onChange={onChange}
                showResults={setShowResults}
                data={data}
                showMobileSearchMenu={setShowMobileSearchMenu}
              ></MobileSearch>
            ) : (
              <></>
            )}
            <div className="flex-col ml-8" ref={modalRef}>
              <div className="hidden lg:flex bg-bg-light">
                <SearchInput onChange={onChange} showResults={setShowResults} data={data}></SearchInput>
              </div>
              <div className="hidden lg:block">
                <div
                  hidden={!showResults}
                  className="absolute overflow-hidden lg:no-scrollbar lg:overflow-y-auto z-[11] lg:w-[440px] lg:h-[430px] bg-bg-light lg:border border-gray lg:rounded-[6px] lg:mt-[7px]"
                >
                  <SearchDropDown data={data}></SearchDropDown>
                </div>
              </div>
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
            <HeaderButton
              className="border-l border-gray lg:hidden"
              onClick={() => {
                console.log("clicked");
                setShowMobileSearchMenu(true);
              }}
            >
              <IconSearch />
            </HeaderButton>
            <HeaderButton className="hidden header-btn border-l border-gray lg:flex">
              <IconWallet />
            </HeaderButton>
            <HeaderButton className="header-btn border-x border-gray" onClick={() => showCartModal(true)}>
              <IconShoppingCart />
            </HeaderButton>
            <HeaderButton className="header-btn lg:hidden">
              <IconHamburger />
            </HeaderButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
