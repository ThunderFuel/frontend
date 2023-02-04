import React, { useState } from "react";
import Button from "components/Button";
import { IconAuction, IconEthereum, IconInfo, IconListed } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import RightMenu from "../components/RightMenu";
import Tab from "components/Tab";
import InputPrice from "../components/InputPrice";
import Dropdown from "components/Dropdown";
import ToggleButton from "components/ToggleButton";
import Input from "components/Input";
import InfoBox from "../components/InfoBox";
import { getDateFromExpirationTime } from "utils";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

// TODO FIXED PRICE ILE AUCTION I AYIR!!!!
const ListNFT = ({ updateListing, onBack }: { updateListing?: boolean; onBack: any }) => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const dispatch = useAppDispatch();

  const [isTimedAuction, setisTimedAuction] = useState(false);
  const [isPrivateSale, setisPrivateSale] = useState(false);
  const [hasStartingPrice, sethasStartingPrice] = useState(false);
  const [privateSaleAddress, setprivateSaleAddress] = useState("");
  const [price, setprice] = useState<any>("");
  const [startingPrice, setstartingPrice] = useState<any>("");
  const [duration, setDuration] = useState("1 day");

  const serviceFee = 2.5;
  const creatorEarnings = 5.5;

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "");
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex justify-end p-5 ">
        <Button
          disabled={!isValidNumber(price)}
          onClick={() => {
            dispatch(setCheckout({ type: CheckoutType.ConfirmListing, price: price }));
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

  const handleToggle = (isOn: boolean) => {
    if (isTimedAuction) sethasStartingPrice(isOn);
    else setisPrivateSale(isOn);
  };

  const calculateReceivingAmount = (price: any) => {
    return price - (price * serviceFee) / 100 - (price * creatorEarnings) / 100;
  };

  return (
    <RightMenu title={updateListing ? "Update Listing" : "List Your NFT"} footer={footer} onBack={onBack}>
      <div className="flex flex-col gap-y-5">
        <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
          <img src={selectedNFT.image} width="64px" className="rounded-[5px] h-fit"></img>
          <div className="flex flex-col w-full">
            <div className="pb-[11px] border-b border-gray">{selectedNFT.name}</div>
            {updateListing && (
              <span className="flex justify-between text-gray-light mt-2">
                Current Price
                <div className={`flex  items-center text-white`}>
                  {selectedNFT.price} <IconEthereum color="gray" />
                </div>
              </span>
            )}
          </div>
        </div>
        <Tab initTab={0} onChange={(value) => setisTimedAuction(!!value)}>
          <Tab.Item id={0}>
            <div className="flex justify-center items-center gap-x-[10px] -my-2">
              <IconListed width="17px" />
              FIXED PRICE
            </div>
          </Tab.Item>
          <Tab.Item id={1} disabled={updateListing ? true : false}>
            <div className="flex justify-center items-center gap-x-[10px] -my-2">
              <IconAuction width="17px" />
              TIMED AUCTION
            </div>
          </Tab.Item>
        </Tab>
        {isTimedAuction && <InfoBox title="Timed Auction" description="Lorem ipsum dolor sit amet." />}
        <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
          {isTimedAuction ? "Set Duration" : "Listing Duration"}
          <div className="flex items-center gap-x-[5px] text-bodySm text-gray-light">
            <IconInfo width="17px" /> <span>Expires on </span> {getDateFromExpirationTime(duration)}
          </div>
          <Dropdown options={["1 day", "3 days", "7 days", "1 month", "3 months", "6 months"]} onSelect={setDuration} className="bg-bg-light text-bodyMd" />
        </div>
        {!isTimedAuction && (
          <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
            Enter Price*
            <InputPrice onChange={setprice} value={price} type="text" />
            {price !== "" && price < selectedNFT.floorPrice && warning}
            <div className="flex text-bodyMd gap-x-2">
              <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.collection?.floor)}>
                {selectedNFT.floorPrice} ETH - Floor Price
              </div>
              <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.traitHighest?.price)}>
                {selectedNFT.topTraitPrice} ETH - Top Trait Price
              </div>
            </div>
            <div className="flex flex-col gap-y-2 p-[15px] rounded-[5px] border border-gray">
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Service Fee</div>
                <div className="">2.5%</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">Creator Earnings</div>
                <div className="">{selectedNFT.collection?.royaltyFee}%</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-gray-light">You’ll Recieve</div>
                <div className={`flex items-center ${isValidNumber(price) ? "text-green" : "text-gray-light"}`}>
                  {isValidNumber(price) ? calculateReceivingAmount(price) : "-"} <IconEthereum />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-y-2 text-head6 font-spaceGrotesk text-white">
          <div className="flex w-full justify-between">
            {isTimedAuction ? "Starting Price" : "Private Sale"}
            <div className="w-fit">
              <ToggleButton isOn={isTimedAuction ? hasStartingPrice : isPrivateSale} onToggle={handleToggle} />
            </div>
          </div>
          <div className="flex gap-x-[5px] items-center text-bodySm text-gray-light">
            <IconInfo width="17px" /> {isTimedAuction ? "Bids below this amount won’t be accepted." : "Only the specified address can buy your item."}
          </div>
          {isTimedAuction
            ? hasStartingPrice && <InputPrice onChange={setstartingPrice} value={startingPrice} type="text" />
            : isPrivateSale && <Input onChange={setprivateSaleAddress} value={privateSaleAddress} type="text" />}
        </div>
        {isTimedAuction && (
          <div className="flex flex-col gap-y-2 p-[15px] rounded-[5px] border border-gray text-head6 font-spaceGrotesk text-white">
            <div className="flex w-full justify-between">
              <div className="text-gray-light">Service Fee</div>
              <div className="">2.5%</div>
            </div>
            <div className="flex w-full justify-between">
              <div className="text-gray-light">Creator Earnings</div>
              <div className="">{selectedNFT.collection?.royaltyFee}%</div>
            </div>
            <div className="flex w-full justify-between">
              <div className="text-gray-light">You’ll Recieve</div>
              <div className={`flex items-center ${isValidNumber(startingPrice) ? "text-green" : "text-gray-light"}`}>
                {isValidNumber(startingPrice) ? calculateReceivingAmount(startingPrice) : "-"} <IconEthereum />
              </div>
            </div>
          </div>
        )}
      </div>
    </RightMenu>
  );
};

export default ListNFT;
