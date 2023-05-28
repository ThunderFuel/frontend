import React, { useState } from "react";
import Button from "components/Button";
import { IconAuction, IconEthereum, IconInfo, IconListed } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import RightMenu from "../components/RightMenu";
import Tab from "components/Tab";
import InputPrice from "../components/InputPrice";
import ToggleButton from "components/ToggleButton";
import Input from "components/Input";
import { formatPrice, getDateFromExpirationTime } from "utils";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import Select from "components/Select";
import { selectExpirationDates } from "./MakeOffer";
import { RightMenuType } from "store/NFTDetailsSlice";
import floorService from "api/floor/floor.service";
import EthereumPrice from "components/EthereumPrice";
import { removeAll } from "../../../store/bulkListingSlice";

const ListNFT = ({ onBack }: { onBack: any }) => {
  const { selectedNFT, presetPrice, rightMenuType } = useAppSelector((state) => state.nftdetails);
  const [topTrait, setTopTrait] = useState(0);
  const dispatch = useAppDispatch();
  const [isTimedAuction, setisTimedAuction] = useState(false);
  const [isPrivateSale, setisPrivateSale] = useState(false);
  const [hasStartingPrice, sethasStartingPrice] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [privateSaleAddress, setprivateSaleAddress] = useState("");
  const [price, setprice] = useState<any>(presetPrice ?? "");
  const [startingPrice, setstartingPrice] = useState<any>(0);
  const [duration, setDuration] = useState(selectExpirationDates[0]);
  const updateListing = rightMenuType === RightMenuType.UpdateListing;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const serviceFee = 2.5;

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "") && price > 0;
  };
  const onCheckoutComplete = () => {
    dispatch(removeAll());
    onBack();
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex justify-end p-5 ">
        <Button
          disabled={(!isTimedAuction ? !isValidNumber(price) : hasStartingPrice ? !isValidNumber(startingPrice) : false) ? true : isButtonDisabled}
          onClick={() => {
            setIsButtonDisabled(true);
            if (isTimedAuction) {
              dispatch(
                setCheckout({
                  type: CheckoutType.ConfirmListing,
                  isAuction: isTimedAuction,
                  expireTime: duration?.value,
                  auctionStartingPrice: startingPrice,
                  onCheckoutComplete,
                })
              );
            } else if (price > 0) {
              dispatch(
                setCheckout({
                  type: updateListing ? CheckoutType.UpdateListing : CheckoutType.ConfirmListing,
                  price: price,
                  expireTime: duration?.value,
                  onCheckoutComplete,
                })
              );
            }

            dispatch(toggleCheckoutModal());
          }}
        >
          CONFIRM LISTING <IconListed />
        </Button>
      </div>
    </div>
  );

  const warning = (
    <div className="flex gap-x-[5px] items-center text-bodySm text-orange">
      <IconInfo width="17px" /> Your price is below the floor price 0.12 ETH
    </div>
  );

  const infoBox = (
    <div className="flex bg-gray gap-x-[15px] p-[15px] text-bodySm font-spaceGrotesk text-white rounded-md">
      <IconInfo className="w-6 h-6" />
      <div className="flex w-full flex-col gap-y-[5px]">
        <h6 className="text-head6 font-spaceGrotesk">Timed Auction</h6>
        <p className="w-full text-bodyMd text-gray-light">You can accept the highest bid at any time during or after the auction.</p>
      </div>
    </div>
  );

  const handleToggle = () => {
    if (isTimedAuction) sethasStartingPrice((prev) => !prev);
    else setisPrivateSale((prev) => !prev);
  };

  const calculateReceivingAmount = (price: any) => {
    return price - (price * serviceFee) / 100 - (price * selectedNFT.collection?.royaltyFee) / 100;
  };

  const fetchTopTrait = async () => {
    try {
      const responseTopTrait = await floorService.getTopTraitByTokenIds([selectedNFT.id]);
      setTopTrait(responseTopTrait.data[selectedNFT.id]);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchTopTrait();
  }, [selectedNFT]);

  return (
    <RightMenu title={updateListing ? "Update Listing" : "List Your NFT"} footer={footer} onBack={onBack}>
      <div className="flex flex-col gap-y-5">
        <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
          <img src={selectedNFT.image} className="rounded-[5px] w-16 h-16"></img>
          <div className="flex flex-col w-full">
            <div className="pb-[11px] border-b border-gray">{selectedNFT.name}</div>
            {updateListing && (
              <span className="flex justify-between text-gray-light mt-2">
                Current Price
                <div className={`flex  items-center text-white`}>
                  <EthereumPrice price={selectedNFT.price} priceClassName="text-head6 font-spaceGrotesk" />
                </div>
              </span>
            )}
          </div>
        </div>
        <Tab initTab={0} onChange={(value) => setisTimedAuction(!!value)}>
          <Tab.Item id={0} className="w-full">
            <div className="flex justify-center items-center gap-x-[10px] -my-2 p-1">
              <IconListed className="w-[17px] h-[17px]" />
              FIXED PRICE
            </div>
          </Tab.Item>
          <Tab.Item id={1} disabled={updateListing} className="w-full">
            <div className="flex justify-center items-center gap-x-[10px] -my-2 p-1">
              <IconAuction className="w-[17px] h-[17px]" />
              TIMED AUCTION
            </div>
          </Tab.Item>
        </Tab>
        {isTimedAuction && infoBox}
        <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
          {isTimedAuction ? "Set Duration" : "Listing Duration"}
          <div className="flex items-center gap-x-[5px] text-bodySm text-gray-light">
            <IconInfo className="w-[17px] h-[17px]" />
            <span>Expires on </span> {getDateFromExpirationTime(duration.value)}
          </div>
          <Select options={selectExpirationDates} onChange={setDuration} value={duration} />
        </div>
        {!isTimedAuction && (
          <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
            Enter Price*
            <InputPrice onChange={setprice} value={price} type="text" />
            {price !== "" && price < selectedNFT?.floorPrice && warning}
            <div className="flex text-bodyMd gap-x-2">
              <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.collection?.floor)}>
                {selectedNFT?.collection ? formatPrice(selectedNFT?.collection?.floor) : "-"} ETH - Floor Price
              </div>
              <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(topTrait)}>
                {formatPrice(topTrait)} ETH - Top Trait Price
              </div>
            </div>
            <div className="flex flex-col gap-y-2 p-[15px] rounded-[5px] border border-gray">
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Service Fee</div>
                <div className="">2.5%</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Creator Earnings</div>
                <div className={`${selectedNFT.collection?.royaltyFee ? "" : "text-gray-light"}`}>{selectedNFT.collection?.royaltyFee ? `${selectedNFT.collection?.royaltyFee} %` : "-"}</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">You’ll Receive</div>
                <div className={`flex items-center ${isValidNumber(price) ? "text-green" : "text-gray-light"}`}>
                  {isValidNumber(price) ? formatPrice(calculateReceivingAmount(price)) : "-"} <IconEthereum />
                </div>
              </div>
            </div>
          </div>
        )}
        {isTimedAuction && (
          <div className="flex flex-col gap-y-2 text-head6 font-spaceGrotesk text-white">
            <div className="flex w-full justify-between">
              {isTimedAuction ? "Starting Price" : "Private Sale"}
              <div className="w-fit">
                <ToggleButton isOn={isTimedAuction ? hasStartingPrice : isPrivateSale} onToggle={handleToggle} />
              </div>
            </div>
            <div className="flex gap-x-[5px] items-center text-bodySm text-gray-light">
              <IconInfo className="w-[17px] h-[17px]" /> {isTimedAuction ? "Bids below this amount won’t be accepted." : "Only the specified address can buy your item."}
            </div>
            {isTimedAuction
              ? hasStartingPrice && <InputPrice onChange={setstartingPrice} value={startingPrice} type="text" />
              : isPrivateSale && <Input onChange={(event: any) => setprivateSaleAddress(event.target.value)} type="text" />}
          </div>
        )}
        {isTimedAuction && (
          <div className="flex flex-col gap-y-2 p-[15px] rounded-[5px] border border-gray text-head6 font-spaceGrotesk text-white">
            <div className="flex w-full justify-between">
              <div className="text-gray-light">Service Fee</div>
              <div className="">2.5%</div>
            </div>
            <div className="flex w-full justify-between">
              <div className="text-gray-light">Creator Earnings</div>
              <div className={`${selectedNFT.collection?.royaltyFee ? "" : "text-gray-light"}`}>{selectedNFT.collection?.royaltyFee ? `${selectedNFT.collection?.royaltyFee} %` : "-"}</div>
            </div>
            <div className="flex w-full justify-between">
              <div className="text-gray-light">You’ll Receive</div>
              <div className={`flex items-center ${isValidNumber(startingPrice) ? "text-green" : "text-gray-light"}`}>
                {isValidNumber(startingPrice) ? formatPrice(calculateReceivingAmount(startingPrice)) : "-"}
                <IconEthereum />
              </div>
            </div>
          </div>
        )}
      </div>
    </RightMenu>
  );
};

export default ListNFT;
