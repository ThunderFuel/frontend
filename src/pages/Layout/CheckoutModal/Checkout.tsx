import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import CartItem from "components/CartItem";
import Modal from "components/Modal";
import NotFound from "components/NotFound";

import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { getCartTotal, removeAll, removeBuyNowItem } from "store/cartSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { isObjectEmpty, toGwei } from "utils";

import { bulkPurchase, executeOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { ZERO_B256, contracts, exchangeContractId, provider, strategyFixedPriceContractId } from "global-constants";
import { NativeAssetId, Provider } from "fuels";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
}

const Footer = ({ approved, onClose }: { approved: boolean; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex w-full items-center justify-center p-5"}>
        <Button className="w-full tracking-widest" onClick={onClose}>
          DONE
        </Button>
      </div>
    </div>
  );
};

const CheckoutProcessItem = ({ title, description, status = Status.notStarted }: { title: string; description: string; status: Status }) => {
  const isPending = status === Status.pending;
  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone className="text-white" />,
  };

  return (
    <div className="flex items-center gap-x-[22px]">
      {icon[status]}
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending && "text-white")}>{title}</div>
        <div className={clsx("body-medium transition-all duration-300 overflow-hidden", isPending ? "h-5 opacity-100" : " h-0 opacity-0")}>{description}</div>
      </div>
    </div>
  );
};

const CheckoutProcess = ({ onComplete, approved }: { onComplete: () => void; approved: any }) => {
  const [transactionStatus, setTransactionStatus] = useState({
    // confirmTransaction: Status.pending,
    waitingForApproval: Status.pending,
    purchaseConfirm: Status.notStarted,
  });
  const [partiallyFailed, setPartiallyFailed] = useState(false);

  const onSetTransactionStatus = (state: any) => {
    setTransactionStatus((prevState) => ({
      ...prevState,
      ...state,
    }));
  };
  const startTransactionProcess = async () => {
    // const confirmTransaction = (await mockTransaction()) as Status;
    // onSetTransactionStatus({
    //   confirmTransaction,
    //   waitingForApproval: Status.pending,
    // });

    if (approved) {
      const waitingForApproval = Status.done;
      const purchaseConfirm = Status.done;
      onSetTransactionStatus({
        waitingForApproval,
        purchaseConfirm,
      });

      return;
    } else {
      const waitingForApproval = transactionStatus.waitingForApproval;
      onSetTransactionStatus({
        waitingForApproval,
      });
    }
    onComplete();
  };

  React.useEffect(() => {
    setPartiallyFailed(false);
    startTransactionProcess();
  }, [approved]);

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col p-5 gap-y-[25px]  border-gray">
        {/* <CheckoutProcessItem status={transactionStatus.confirmTransaction} title="Confirm transaction" description="Proceed in your wallet and confirm transaction" /> */}
        <CheckoutProcessItem status={transactionStatus.waitingForApproval} title="Wait for approval" description="Waiting for transaction to be approved" />
        <CheckoutProcessItem status={transactionStatus.purchaseConfirm} title="Purchase completed!" description="Congrats your purchase is completed." />

        {partiallyFailed && (
          <div className="flex justify-center gap-x-2 p-2.5 border bg-bg-light border-gray rounded-[5px]">
            <div className="flex">
              <IconWarning className="fill-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-h6 text-white">1 item failed</span>
              <span className="body-small text-gray-light">Purchases can fail due to network issues, gas fee increases, or because someone else bought the item before you.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CheckoutCartItems = ({ items, itemCount, totalAmount, approved }: { items: any; itemCount: number; totalAmount: number | string; approved: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getImages = items.slice(0, itemCount > 3 ? 3 : itemCount).map((i: any) => (i.image ? i.image : i.tokenImage));
  const titleSlot = approved && (
    <div className="flex gap-x-2.5">
      {/* <button className="body-small text-gray-light underline">View on Blockchain</button> */}
      {itemCount !== 1 && (
        <button className="body-small text-gray-light underline" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <CartItem
          text="Total"
          name={`${itemCount === 1 ? items[0].name : itemCount + " Items"}`}
          price={totalAmount}
          image={getImages}
          id={1}
          className={clsx(showDetails && "rounded-b-none")}
          titleSlot={titleSlot}
        />
      </div>
      <div className="overflow-hidden transition-all" style={{ height: showDetails ? `${ref.current?.scrollHeight}px` : 0 }} ref={ref}>
        <div className={clsx("p-2.5 gap-y-2.5 border-x border-b rounded-b-md border-gray")}>
          {items.map((item: any, i: number) => (
            <CartItem key={i} text="Price" name={item.name} price={item.price} image={item.image} id={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};
const Checkout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const [successCheckout, setSuccessCheckout] = React.useState(false);
  const dispatch = useAppDispatch();
  const { totalAmount, itemCount, items, buyNowItem } = useAppSelector((state) => state.cart);
  const { user, wallet } = useAppSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);

  const onComplete = async () => {
    const tokenIds = !isObjectEmpty(buyNowItem) ? [buyNowItem.id] : items.map((item: any) => item.id);
    try {
      nftdetailsService.getTokensIndex(tokenIds).then((res) => {
        if (!isObjectEmpty(buyNowItem)) {
          console.log("BUY NOW");
          const order = {
            isBuySide: true,
            taker: user.walletAddress,
            maker: buyNowItem.userWalletAddress ?? buyNowItem.user.walletAddress,
            nonce: res.data[tokenIds[0]],
            price: toGwei(buyNowItem.price),
            token_id: buyNowItem.tokenOrder,
            collection: buyNowItem.contractAddress ?? buyNowItem.collection.contractAddress,
            strategy: strategyFixedPriceContractId,
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
          };

          const prov = new Provider("https://beta-3.fuel.network/graphql");
          setContracts(contracts, prov);

          console.log(order);
          executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success")
                nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                  if (res.data) {
                    setSuccessCheckout(res.data);
                    setApproved(true);
                    window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                  }
                });
            })
            .catch((e) => {
              console.log(e);
              setStartTransaction(false);
            });
        } else if (tokenIds.length === 1) {
          console.log("BUY 1 ITEM");
          const order = {
            isBuySide: true,
            taker: user.walletAddress,
            maker: items[0].userWalletAddress,
            nonce: res.data[items[0].id],
            price: toGwei(items[0].price),
            token_id: items[0].tokenOrder,
            collection: items[0].contractAddress,
            strategy: strategyFixedPriceContractId,
            extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
          };

          const prov = new Provider("https://beta-3.fuel.network/graphql");
          setContracts(contracts, prov);

          console.log(order);
          executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId)
            .then((res) => {
              console.log(res);
              if (res.transactionResult.status.type === "success")
                nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                  if (res.data) {
                    setSuccessCheckout(res.data);
                    setApproved(true);
                    window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                  }
                });
            })
            .catch((e) => {
              console.log(e);
              setStartTransaction(false);
            });
        } else {
          console.log("BULK PURCHASE");
          nftdetailsService.getTokensIndex(tokenIds).then((res) => {
            const takerOrders = items.map((item) => {
              return {
                isBuySide: true,
                taker: user.walletAddress,
                maker: item.userWalletAddress,
                nonce: res.data[item.id],
                price: toGwei(item.price),
                token_id: item.tokenOrder,
                collection: item.contractAddress,
                strategy: strategyFixedPriceContractId,
                extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
              };
            });

            const prov = new Provider("https://beta-3.fuel.network/graphql");
            setContracts(contracts, prov);

            console.log(takerOrders);
            bulkPurchase(exchangeContractId, provider, wallet, takerOrders, NativeAssetId)
              .then((res) => {
                console.log("bulkPurchase res:", res);
                if (res?.transactionResult.status.type === "success")
                  nftdetailsService.tokenBuyNow(tokenIds, user.id).then((res) => {
                    if (res.data) {
                      setSuccessCheckout(res.data);
                      setApproved(true);
                      window.dispatchEvent(new CustomEvent("CompleteCheckout"));
                    }
                  });
              })
              .catch((e) => {
                console.log(e);
                setStartTransaction(false);
              });
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (!show && successCheckout) {
      if (!isObjectEmpty(buyNowItem)) dispatch(removeBuyNowItem());
      else dispatch(removeAll());
    }
  }, [show, successCheckout]);

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
        <CheckoutProcess onComplete={onComplete} approved={approved} />
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
    <Modal backdropDisabled={true} className="checkout" title="Checkout" show={show} onClose={onClose} footer={<Footer approved={approved} onClose={onClose} />}>
      <div className="flex flex-col p-5">
        {!isObjectEmpty(buyNowItem) ? (
          <CheckoutCartItems items={[buyNowItem]} itemCount={1} totalAmount={buyNowItem.price} approved={approved} />
        ) : items.length > 0 ? (
          <CheckoutCartItems items={items} itemCount={itemCount} totalAmount={totalAmount} approved={approved} />
        ) : (
          <NotFound>Your cart is empty. Start adding NFTs to your cart to collect.</NotFound>
        )}
      </div>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
    </Modal>
  );
};

export default Checkout;
