import React, { useState } from "react";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";

import BulkListTable from "./components/BulkListTable";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { getBulkListingTableItems } from "store/bulkListingSlice";
import floorService from "api/floor/floor.service";
import { useIsMobile } from "hooks/useIsMobile";

const BulkListing = () => {
  const isMobile = useIsMobile();
  const items = useSelector(getBulkListingTableItems);
  const [collectionFloor, setCollectionFloor] = useState({} as any);
  const [topTraitByToken, setTopTraitByToken] = useState({} as any);
  const [prices, setPrices] = React.useReducer((prevState: any, nextState: any) => {
    return { ...prevState, ...nextState };
  }, {});

  const onChangeBulkPrice = (value: any) => {
    items.forEach((item: any) => {
      setPrices({ [item.uid]: value });
    });
  };
  const onUpdatePrice = (uid: string, price: any) => {
    setPrices({ [uid]: price });
  };

  const fetchData = async () => {
    const collectionIds = items.map((item) => item.collectionId);
    const collectionItemIds = items.map((item) => item.id);
    try {
      const [responseFloor, responseTopTrait] = await Promise.all([floorService.getCollectionFloor(collectionIds), floorService.getTopTraitByTokenIds(collectionItemIds)]);
      setCollectionFloor(
        responseFloor.data.reduce((obj: any, item: any) => {
          obj[item.collectionId] = item.price;

          return obj;
        }, {})
      );

      setTopTraitByToken(responseTopTrait.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSetTopFloorPrice = () => {
    getItems.forEach((item: any) => {
      onUpdatePrice(item.uid, item.floor);
    });
  };
  const onTopTraitPrice = () => {
    getItems.forEach((item: any) => {
      onUpdatePrice(item.uid, item.topTrait);
    });
  };

  const getItems = React.useMemo(() => {
    return items.map((item: any) => ({
      ...item,
      floor: collectionFloor?.[item.collectionId],
      topTrait: topTraitByToken?.[item.id],
      proceedPrice: (prices[item.uid] ?? 0) * (1 - (item.royalty + 2.5) / 100),
      royaltyPrice: ((prices[item.uid] ?? 0) * item.royalty) / 100,
    }));
  }, [items, collectionFloor, topTraitByToken, prices]);

  React.useEffect(() => {
    fetchData();
  }, [items]);

  return (
    <div className="flex flex-col">
      <div className="px-5 lg:px-32 border-b border-gray">
        <div className="flex items-center justify-between py-5 lg:border-x lg:border-gray lg:py-16 lg:px-10">
          <h2 className="text-h3 lg:text-h2 text-white">Bulk Listing</h2>
          <h6 className="lg:hidden text-h6 text-gray-light">{getItems.length} Items</h6>
        </div>
      </div>
      <div className="lg:px-32">
        <div className="lg:border-x border-gray h-full">
          <div className="px-5 py-3 lg:py-2.5 flex items-center justify-between">
            <h6 className="hidden lg:flex text-h6 text-gray-light">{getItems.length} Items</h6>
            <div className="flex items-center gap-2.5 lg:gap-5">
              <div className="flex gap-2.5 lg:gap-3">
                <Button className="btn-secondary btn-sm uppercase lg:w-[240px]" onClick={onSetTopFloorPrice}>
                  {isMobile ? "Floor Price" : "Set Floor Price"}
                </Button>
                <Button className="btn-secondary btn-sm uppercase lg:w-[240px]" onClick={onTopTraitPrice}>
                  {isMobile ? "top traıt price" : "set top traıt price"}
                </Button>
              </div>
              <div className="w-[92px] lg:w-32">
                <InputEthereum className="h-10" onChange={onChangeBulkPrice} />
              </div>
            </div>
          </div>
          <div className="lg:border-t border-gray lg:pb-32">
            <BulkListTable items={getItems} onUpdatePrice={onUpdatePrice} prices={prices} />
          </div>
          <Footer items={getItems} prices={prices} />
        </div>
      </div>
    </div>
  );
};

export default BulkListing;
