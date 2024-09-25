import React, { useState } from "react";
import { IconLikeHand, IconTag } from "../../../icons";
import Modal from "../../../components/Modal";
import { useSelector } from "react-redux";
import { getBulkListingTableItems } from "../../../store/bulkListingSlice";
import BulkListTable from "../../BulkListing/components/BulkListTable";
import floorService from "../../../api/floor/floor.service";
import { useProfile } from "../ProfileContext";
import Button from "../../../components/Button";
import InputEthereum from "../../../components/InputEthereum";
import { useIsMobile } from "../../../hooks/useIsMobile";
import Footer from "../../BulkListing/components/Footer";

const BulkListingContainer = ({ onClose }: any) => {
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
      onUpdatePrice(item.uid, item.floor ?? 0);
    });
  };
  const onTopTraitPrice = () => {
    getItems.forEach((item: any) => {
      onUpdatePrice(item.uid, item.topTrait ?? 0);
    });
  };

  const getItems = React.useMemo(() => {
    return items.map((item: any) => ({
      ...item,
      floor: collectionFloor?.[item.collectionId],
      topTrait: topTraitByToken?.[item.id],
      proceedPrice: prices[item.uid] * (1 - (item.royalty + 2.5) / 100),
      royaltyPrice: (prices[item.uid] * item.royalty) / 100,
    }));
  }, [items, collectionFloor, topTraitByToken, prices]);
  React.useEffect(() => {
    fetchData();
  }, [items]);
  console.log(getItems);

  return (
    <>
      <div className="p-5 flex flex-col gap-3">
        <div className="grid grid-cols-2 items-center">
          <div className="text-h6 text-white">Set Price for All</div>
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
              <InputEthereum containerClassName="lg:h-[42px]" className="h-10" onChange={onChangeBulkPrice} />
            </div>
          </div>
        </div>
        <div className="p-3 max-h-[480px] overflow-hidden overflow-y-scroll border border-gray rounded-2xl">
          <BulkListTable items={getItems} onUpdatePrice={onUpdatePrice} prices={prices} theadClassName="!hidden" />
        </div>
      </div>
      <Footer items={getItems} prices={prices} onClose={onClose} />
    </>
  );
};

const ModalBulkListing = () => {
  const { showBulkListing, setShowBulkListing } = useProfile();
  const onClose = () => {
    setShowBulkListing(false);
  };

  return (
    <Modal bodyClassName="!w-full !max-w-[80%]" backdropDisabled={true} className="checkout" show={showBulkListing} onClose={onClose}>
      <Modal.Tabs activeTab={0}>
        <Modal.TabItem headerIcon={IconTag} headerText="Bulk Listing">
          <BulkListingContainer onClose={onClose} />
        </Modal.TabItem>
        <Modal.TabItem headerIcon={IconLikeHand} headerText="Confirm Bulk Listing">
          tab 2
        </Modal.TabItem>
      </Modal.Tabs>
    </Modal>
  );
};

export default ModalBulkListing;
