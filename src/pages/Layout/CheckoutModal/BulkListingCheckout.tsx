import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconSpinner, IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess, handleTransactionError } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { toGwei } from "utils";
import { CheckoutCartItems } from "./Checkout";
import { useWallet } from "hooks/useWallet";
import { strategyFixedPriceContractId } from "global-constants";
import FuelProvider from "providers/FuelProvider";
import { Approved, FooterCloseButton, TransactionFailed, TransactionRejected } from "./MakeOfferCheckout";
import { set } from "react-hook-form";

const checkoutProcessTexts = {
  title1: "Confirm your listing",
  description1: "Proceed in your wallet and confirm the listing.",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Your NFT listed!",
  description3: "Congrats, your NFT succesfully listed.",
};

const Footer = ({ approved, onDone }: { approved: boolean; onDone: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={onDone}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const BulkListingCheckout = ({ show, onClose, onDone }: { show: boolean; onClose: any; onDone: any }) => {
  const { bulkListItems, bulkUpdateItems } = useAppSelector((state) => state.checkout);
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const { handleBulkListing } = useWallet();
  const fuel = new FuelProvider();

  const [totalAmount, setTotalAmount] = useState("");

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const bulkItems = bulkListItems.concat(bulkUpdateItems);
  let bulkListMakerOders = [] as any;
  let bulkUpdateMakerOders = [] as any;
  const promises = [] as any;
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  function calculateTotalAmount() {
    let total = 0;
    bulkItems.forEach((item: any) => {
      total += item.price;
    });

    return total;
  }

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

  const onComplete = async () => {
    try {
      handleBulkListing({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData });
    } catch (e) {
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }
  };

  React.useEffect(() => {
    if (show) {
      setTotalAmount(calculateTotalAmount().toString());
      onComplete();
    }
  }, [show]);

  return (
    <Modal
      bodyClassName="!w-full !max-w-[600px]"
      backdropDisabled={true}
      className="checkout"
      title={approved || !startTransaction || isFailed ? "" : "Bulk Listing"}
      show={show}
      onClose={onClose}
      footer={!startTransaction || isFailed ? <FooterCloseButton onClose={onClose} /> : <Footer approved={approved} onDone={onDone} />}
    >
      {!startTransaction ? (
        <TransactionRejected />
      ) : isFailed ? (
        <TransactionFailed />
      ) : approved ? (
        <div className="flex flex-col w-full gap-5 p-5">
          <Approved title="Bulk Listing Completed Successfully!" description="All selected items have been listed. You can review and manage your listings in your profile." />
          <div className="flex flex-col w-full">
            <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={totalAmount} approved={approved} />
          </div>
        </div>
      ) : (
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
      )}
    </Modal>
    // <Modal backdropDisabled={true} className="checkout" title="Bulk Listing" show={show} onClose={onClose} footer={<Footer approved={approved} onDone={onDone} />}>
    //   <div className="flex flex-col p-5">
    //     <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={""} approved={approved} />
    //   </div>
    //   <div className="flex border-t border-gray">{checkoutProcess}</div>
    // </Modal>
  );
};

export default BulkListingCheckout;
