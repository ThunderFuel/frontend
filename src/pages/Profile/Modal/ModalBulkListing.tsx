import React, { useState } from "react";
import { IconLikeHand, IconSpinner, IconTag } from "../../../icons";
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
import { Approved, TransactionFailed, TransactionRejected } from "../../Layout/CheckoutModal/MakeOfferCheckout";
import { CheckoutCartItems } from "../../Layout/CheckoutModal/Checkout";
import { useAppSelector } from "../../../store";
import { useWallet } from "../../../hooks/useWallet";
import FuelProvider from "../../../providers/FuelProvider";
import { handleTransactionError } from "../../Layout/CheckoutModal/components/CheckoutProcess";
import nftdetailsService from "../../../api/nftdetails/nftdetails.service";
import { toGwei } from "../../../utils";
import { strategyFixedPriceContractId } from "../../../global-constants";
import clsx from "clsx";

const BulkListingContainer = ({ onClose, onTriggerCheckout }: any) => {
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

  return (
    <>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2 items-start lg:grid lg:grid-cols-3 lg:items-center">
          <div className="text-h6 text-white">Set Price for All</div>
          <div className="col-span-2 grid grid-cols-3 lg:flex items-center gap-2.5 lg:gap-5">
            <div className="col-span-2 flex gap-2.5 lg:gap-3">
              <Button className="btn-secondary btn-sm uppercase lg:w-[240px]" onClick={onSetTopFloorPrice}>
                {isMobile ? "Floor Price" : "Set Floor Price"}
              </Button>
              <Button className="btn-secondary btn-sm uppercase lg:w-[240px]" onClick={onTopTraitPrice}>
                {isMobile ? "top traıt price" : "set top traıt price"}
              </Button>
            </div>
            <div className="flex-1 w-full lg:w-32">
              <InputEthereum containerClassName="lg:h-[42px]" className="h-10" onChange={onChangeBulkPrice} />
            </div>
          </div>
        </div>
        <div className="p-3 max-h-[480px] overflow-hidden overflow-y-scroll border border-gray rounded-2xl">
          <BulkListTable items={getItems} onUpdatePrice={onUpdatePrice} prices={prices} theadClassName="!hidden" />
        </div>
      </div>
      <Footer items={getItems} prices={prices} onClose={onClose} onTriggerCheckout={onTriggerCheckout} />
    </>
  );
};

const BulkListingCheckout = ({ onClose }: any) => {
  const { bulkListItems, bulkUpdateItems } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const { handleBulkListing } = useWallet();
  const fuel = new FuelProvider();

  const [startTransaction, setStartTransaction] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [approved, setApproved] = useState(false);

  const bulkItems = bulkListItems.concat(bulkUpdateItems);
  let bulkListMakerOders = [] as any;
  let bulkUpdateMakerOders = [] as any;

  const [totalAmount, setTotalAmount] = useState("");

  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const calculateTotalAmount = () => {
    let total = 0;
    bulkItems.forEach((item: any) => {
      total += item.price;
    });

    return total;
  };
  const handleOrders = async ({ bulkListItems, bulkUpdateItems }: { bulkListItems: any; bulkUpdateItems: any }) => {
    const tokenIds = bulkUpdateItems.map((item: any) => item.tokenId); // for bulkupdate
    let updatePromise;
    let listPromise;

    const _baseAssetId = await fuel.getBaseAssetId();

    if (bulkUpdateItems.length > 0) {
      const res = await nftdetailsService.getTokensIndex(tokenIds);
      bulkUpdateMakerOders = bulkUpdateItems.map((item: any) => {
        return {
          isBuySide: false,
          maker: user.walletAddress,
          collection: item.collection,
          token_id: item.tokenOrder,
          price: toGwei(item.price).toNumber(),
          amount: 1,
          nonce: res.data[item.tokenId],
          strategy: strategyFixedPriceContractId,
          payment_asset: _baseAssetId,
          expiration_range: 315569260,
          extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 },
        };
      });
      promises.push(updatePromise);
    }

    if (bulkListItems.length > 0) {
      const res = await nftdetailsService.getLastIndex(0, user.id);
      bulkListMakerOders = bulkListItems.map((item: any, index: any) => {
        return {
          isBuySide: false,
          maker: user.walletAddress,
          collection: item.collection,
          token_id: item.tokenOrder,
          price: toGwei(item.price).toNumber(),
          amount: 1,
          nonce: res.data + 1 + index,
          strategy: strategyFixedPriceContractId,
          payment_asset: _baseAssetId,
          expiration_range: 315569260,
          extra_params: { extra_address_param: _baseAssetId, extra_contract_param: _baseAssetId, extra_u64_param: 0 },
        };
      });
      promises.push(listPromise);
    }

    return { bulkListMakerOders, bulkUpdateMakerOders };
  };

  const promises = [] as any;

  const onComplete = async () => {
    try {
      handleBulkListing({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData });
    } catch (e) {
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }
  };

  React.useEffect(() => {
    setTotalAmount(calculateTotalAmount().toString());
    onComplete();
  }, []);

  if (!startTransaction) {
    return <TransactionRejected />;
  } else if (isFailed) {
    return (
      <>
        <div className="px-5">
          <TransactionFailed />
        </div>
        <div className="p-5 gap-2.5 border-t border-gray">
          <Button className="btn-secondary w-full" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      </>
    );
  } else if (approved) {
    return (
      <>
        <div className="flex flex-col w-full gap-5 p-5">
          <Approved title="Bulk Listing Completed Successfully!" description="All selected items have been listed. You can review and manage your listings in your profile." />
          <div className="flex flex-col w-full">
            <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={totalAmount} approved={approved} />
          </div>
        </div>
        <div className="p-5 gap-2.5 border-t border-gray">
          <Button className="w-full" onClick={onClose}>
            VIEW PURCHASE
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="flex-center flex-col w-full gap-8 px-[25px] pt-5 pb-[50px]">
      <div className="flex flex-col w-full">
        <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={totalAmount} approved={approved} />
      </div>
      <IconSpinner className="animate-spin text-white w-10 h-10" />
      <div className="flex flex-col gap-2">
        <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
        <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
      </div>
    </div>
  );
};

const ModalBulkListing = () => {
  const { showBulkListing, setShowBulkListing } = useProfile();
  const [activeItem, setActiveItem] = React.useState(0);
  const onClose = () => {
    setActiveItem(0);
    setShowBulkListing(false);
  };
  const onTriggerCheckout = (stepNumber: any) => {
    setActiveItem(stepNumber);
  };

  return (
    <Modal bodyClassName={clsx("!w-full", activeItem === 0 ? "lg:!max-w-[80%]" : " lg:!max-w-[650px]")} backdropDisabled={true} className="checkout" show={showBulkListing} onClose={onClose}>
      <Modal.Tabs activeItem={activeItem}>
        <Modal.TabItem headerIcon={IconTag} headerText="Bulk Listing">
          <BulkListingContainer onClose={onClose} onTriggerCheckout={onTriggerCheckout} />
        </Modal.TabItem>
        <Modal.TabItem headerIcon={IconLikeHand} headerText="Confirm Bulk Listing">
          <BulkListingCheckout onClose={onClose} />
        </Modal.TabItem>
      </Modal.Tabs>
    </Modal>
  );
};

export default ModalBulkListing;
