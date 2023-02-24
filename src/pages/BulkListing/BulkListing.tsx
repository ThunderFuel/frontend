import React, { useState } from "react";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";

import BulkListTable from "./components/BulkListTable";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { getBulkListingTableItems } from "store/bulkListingSlice";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";
import floorService from "api/floor/floor.service";

const BulkListing = () => {
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
    const tokenOrders = items.map((item) => item.tokenOrder);
    try {
      const [responseFloor, responseTopTrait] = await Promise.all([floorService.getCollectionFloor(collectionIds), floorService.getTopTraitByTokenIds(tokenOrders)]);
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
      topTrait: topTraitByToken?.[item.tokenOrder],
      proceedPrice: item.price * 0.0975,
    }));
  }, [items, collectionFloor, topTraitByToken, prices]);

  React.useEffect(() => {
    fetchData();
  }, [items]);

  return !useIsMobile() ? (
    <div className="flex flex-col">
      <div className="px-32 border-b border-gray">
        <div className="border-x border-gray py-16 px-10">
          <h2 className="text-h2 text-white">Bulk Listing</h2>
        </div>
      </div>
      <div className="px-32">
        <div className="border-x border-gray h-full">
          <div className="px-5 py-2.5 flex items-center justify-between">
            <h6 className="text-h6 text-gray-light">{getItems.length} Items</h6>
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <Button className="btn-secondary btn-sm uppercase w-[240px]" onClick={onSetTopFloorPrice}>
                  set top floor price
                </Button>
                <Button className="btn-secondary btn-sm uppercase w-[240px]" onClick={onTopTraitPrice}>
                  set top traıt price
                </Button>
              </div>
              <div className="w-32">
                <InputEthereum onChange={onChangeBulkPrice} />
              </div>
            </div>
          </div>
          <div className="border-t border-gray pb-32">
            <BulkListTable items={getItems} onUpdatePrice={onUpdatePrice} prices={prices} />;
          </div>
          <Footer items={getItems} prices={prices} />
        </div>
      </div>
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default BulkListing;
