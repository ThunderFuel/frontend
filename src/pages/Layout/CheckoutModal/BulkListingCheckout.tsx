import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess, handleTransactionError } from "./components/CheckoutProcess";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { formatTimeContract, toGwei } from "utils";
import { BaseAssetId } from "fuels";
import { CheckoutCartItems } from "./Checkout";
import { useWallet } from "hooks/useWallet";
import { ZERO_B256, strategyFixedPriceContractId } from "global-constants";

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

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const bulkItems = bulkListItems.concat(bulkUpdateItems);
  let bulkListMakerOders = [] as any;
  let bulkUpdateMakerOders = [] as any;
  const promises = [] as any;
  const [wagmiSteps, setWagmiSteps] = useState<any>([]);
  const [stepData, setStepData] = useState<any>([]);

  const handleOrders = async ({ bulkListItems, bulkUpdateItems }: { bulkListItems: any; bulkUpdateItems: any }) => {
    const tokenIds = bulkUpdateItems.map((item: any) => item.tokenId); // for bulkupdate
    let updatePromise;
    let listPromise;
    if (bulkUpdateItems.length > 0) {
      updatePromise = nftdetailsService.getTokensIndex(tokenIds).then((res) => {
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
            payment_asset: BaseAssetId,
            expiration_range: 315569260,
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 },
          };
        });
      });
      promises.push(updatePromise);
    }

    if (bulkListItems.length > 0) {
      listPromise = nftdetailsService.getLastIndex(0, user.id).then((res) => {
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
            payment_asset: BaseAssetId,
            expiration_range: 315569260,
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 },
          };
        });
      });
      promises.push(listPromise);
    }

    return { bulkListMakerOders, bulkUpdateMakerOders };
  };

  const onComplete = async () => {
    try {
      handleBulkListing({ promises, user, handleOrders, bulkListItems, bulkUpdateItems, wallet, setApproved, setStartTransaction, setIsFailed, wagmiSteps, setWagmiSteps, setStepData });
    } catch (e) {
      console.log("BulkListingCheckout", e);
      handleTransactionError({ error: e, setStartTransaction, setIsFailed });
    }
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <>
          <CheckoutProcess
            bulkListItems={bulkListItems}
            bulkUpdateItems={bulkUpdateItems}
            stepData={stepData}
            wagmiSteps={wagmiSteps}
            onComplete={onComplete}
            data={checkoutProcessTexts}
            approved={approved}
            failed={isFailed}
          />
          {isFailed && (
            <div className="flex flex-col w-full border-t border-gray">
              <Button className="btn-secondary m-5" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="text-red" />
            <span className="text-h5 text-white">You rejected the request in your wallet!</span>
          </div>
          <Button className="btn-secondary m-5" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Modal backdropDisabled={true} className="checkout" title="Bulk Listing" show={show} onClose={onClose} footer={<Footer approved={approved} onDone={onDone} />}>
      <div className="flex flex-col p-5">
        <CheckoutCartItems items={bulkItems} itemCount={bulkItems.length} totalAmount={""} approved={approved} />
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default BulkListingCheckout;
