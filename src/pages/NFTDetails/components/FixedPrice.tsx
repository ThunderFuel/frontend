import React, { useEffect, useRef, useState } from "react";
import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAddCart, IconCart, IconInfo, IconListed, IconMinus, IconOffer, IconPlus, IconRemove, IconThunder } from "icons";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { add, addBuyNowItem, remove } from "store/cartSlice";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { remainingTime } from "./AuctionCountdown";
import { CheckoutType, setCheckout, setIsInsufficientBalance, toggleCheckoutModal } from "store/checkoutSlice";
import { toggleWalletModal } from "store/walletSlice";
import { useWallet } from "hooks/useWallet";
import { compareAddresses, formatPrice } from "utils";
import useToast from "hooks/useToast";
import { AssetMockNFT1 } from "assets";

const mockData = {
  views: 22,
  totalCount: 20,
  available: 3,
  userOwns: 2,
  ownerPictures: [AssetMockNFT1, AssetMockNFT1, AssetMockNFT1],
  ownerCount: 8,
  network: "Fuel",
  lastListing: { user: { userId: 1, userName: "okitoki", image: AssetMockNFT1 }, price: 1.5, address: "0x123456" },
  listings: [
    { ownerPicture: AssetMockNFT1, price: 1.5, address: "0x123456" },
    { ownerPicture: AssetMockNFT1, price: 2, address: "0x123456" },
    { ownerPicture: AssetMockNFT1, price: 3, address: "0x123456" },
  ],
};

const FixedPrice = ({ isMultipleEdition }: any) => {
  const dispatch = useDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { items } = useAppSelector((state) => state.cart);
  const { show } = useAppSelector((state) => state.checkout);

  const expireTime = selectedNFT.expireTime;
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [remaining, setRemaining] = useState(remainingTime(expireTime));
  const previousMinutes = useRef(remaining.minutes);
  const { days, hours, minutes } = remainingTime(expireTime);
  const [addCartIsDisabled, setAddCartIsDisabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [multipleEditionBuyArray, setMultipleEditionBuyArray] = useState([mockData.listings[0]]);

  const { hasEnoughFunds } = useWallet();

  const isOwner = () => {
    return compareAddresses(user?.id, selectedNFT?.user?.id);
  };

  const isItemAlreadyAdded = () => items.find((item) => item.uid === selectedNFT.uid);

  const onChange = (action: any) => {
    if (action === "add") {
      setMultipleEditionBuyArray((prev) => [...prev, mockData.listings[prev.length]]);
    } else if (action === "remove") {
      setMultipleEditionBuyArray((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const calculateAveragePrice = () => {
    const sum = multipleEditionBuyArray.reduce((acc, item) => acc + item.price, 0);
    const average = sum / multipleEditionBuyArray.length;

    return average;
  };

  const InputCount = ({ onChange, remainingAmount }: any) => {
    const [value, setValue] = useState(1);
    const onUpdateValue = (number: number) => {
      const val = value + number;
      if (val < 1 || val > remainingAmount) {
        return false;
      }
      setValue(val);
      onChange(number === 1 ? "add" : "remove");
    };

    return (
      <div className="flex items-center text-white w-fit border border-white border-opacity-10 rounded-md">
        <h3 className="w-16 text-center text-h3 border-r border-r-white border-opacity-10 py-1">{value}</h3>
        <div className="flex flex-col items-center">
          <span className="cursor-pointer px-5 py-1 border-b border-b-white border-opacity-10" onClick={() => onUpdateValue(1)}>
            <IconPlus className={value >= remainingAmount ? "opacity-50" : ""} />
          </span>
          <span className="cursor-pointer px-5 py-1" onClick={() => onUpdateValue(-1)}>
            <IconMinus className={value <= 1 ? "opacity-50" : ""} />
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    function scheduleNext() {
      const newRemaining = remainingTime(expireTime);
      if (previousMinutes.current !== newRemaining.minutes) {
        setRemaining(newRemaining);
        previousMinutes.current = newRemaining.minutes;
      }
      timeoutId.current = setTimeout(scheduleNext, 1000);
    }

    scheduleNext();

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [expireTime]);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      {/* <div className="flex pl-2 items-center body-medium text-white gap-x-2 py-[10px]">
        <IconListed className="w-[19px]" />
        Sale ends in {days}d {hours}h {minutes}m
      </div> */}
      <div className="flex w-full bg-bg-light mb-[1px] p-5 last:rounded-b last:mb-0">
        <div className="flex flex-col w-full gap-[5px]">
          <div className="flex justify-between w-full bg-bg-light mb-[1px] last:rounded-b last:mb-0">
            <span className="text-headline-02 text-gray-light">PRICE</span>
            {selectedNFT.lastSalePrice ? (
              <div className="flex h-fit items-center gap-x-[5px]">
                <IconCart width="18px" height="18px" color="#838383" />
                <span className="body-small text-gray-light">Last sale price {formatPrice(selectedNFT.lastSalePrice)} ETH</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <EthereumPrice priceClassName="text-h3 text-white" price={selectedNFT.price} fullPrice={true} />
          {isMultipleEdition && (
            <div className="flex gap-[5px] text-bodySm font-spaceGrotesk text-gray-light">
              <IconInfo className="w-[18px] h-[18px]" /> {multipleEditionBuyArray.length} Edition{multipleEditionBuyArray.length > 1 ? "s" : ""} / Average Item Price: {calculateAveragePrice()}ETH
            </div>
          )}
        </div>
      </div>
      {!isOwner() && (
        <div className="flex flex-col gap-y-[10px] bg-bg-light rounded-b p-5">
          <div className="flex gap-x-[10px] ">
            {isMultipleEdition && <InputCount onChange={onChange} remainingAmount={mockData.listings.length} listings={mockData.listings} />}
            <Button
              className="w-full text-button font-bigShoulderDisplay"
              disabled={isButtonDisabled}
              onClick={() => {
                setIsButtonDisabled(true);
                if (user?.id) {
                  dispatch(setCheckout({ type: CheckoutType.None }));
                  dispatch(addBuyNowItem(selectedNFT));
                  hasEnoughFunds(selectedNFT.price).then((res) => {
                    dispatch(setIsInsufficientBalance(!res));
                    dispatch(toggleCheckoutModal());
                  });
                } else {
                  dispatch(toggleWalletModal());
                }
              }}
            >
              Buy Now <IconThunder width="24px" height="11.58px" />
            </Button>
            <Button
              className={`hover:px-8 px-4 ${addCartIsDisabled || isItemAlreadyAdded() !== undefined ? "btn-secondary" : ""}`}
              onClick={() => {
                if (addCartIsDisabled || isItemAlreadyAdded() !== undefined) {
                  dispatch(remove(selectedNFT.uid));
                  setAddCartIsDisabled(false);
                } else {
                  if (items.length === 5) useToast().error("In the open beta, you can add up to 5 items in your cart.");
                  else {
                    if (isItemAlreadyAdded() === undefined) dispatch(add(selectedNFT));
                    setAddCartIsDisabled(true);
                  }
                }
              }}
            >
              {addCartIsDisabled || isItemAlreadyAdded() !== undefined ? <IconRemove /> : <IconAddCart className="text-black" />}
            </Button>
          </div>
          <Button
            className="btn-secondary no-bg"
            onClick={() => {
              if (!isConnected) dispatch(toggleWalletModal());
              else {
                dispatch(
                  setCheckout({
                    type: CheckoutType.MakeOffer,
                    currentItemId: selectedNFT.id,
                  })
                );
                dispatch(toggleCheckoutModal());
              }
            }}
          >
            MAKE OFFER <IconOffer />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FixedPrice;
