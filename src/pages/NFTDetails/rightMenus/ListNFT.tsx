import React, { useEffect, useRef, useState } from "react";
import Button from "components/Button";
import { IconAuction, IconEthereum, IconInfo, IconListed } from "icons";
import { useAppSelector } from "store";
import RightMenu from "../components/RightMenu";
import Tab from "components/Tab";
import PriceInput from "../components/PriceInput";
import Dropdown from "components/Dropdown";
import ToggleButton from "components/ToggleButton";
import Input from "components/Input";

const ListNFT = () => {
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const [isTimedAuction, setisTimedAuction] = useState(false);
  const [isPrivateSale, setisPrivateSale] = useState(false);
  const [hasStartingPrice, sethasStartingPrice] = useState(false);

  const [price, setprice] = useState<any>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startingPrice, setstartingPrice] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState("second");
  const refPriceInput = useRef(null);
  const refStartingPriceInput = useRef(null);

  const serviceFee = 2.5;
  const creatorEarnings = 5.5;

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "");
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex justify-end p-5 ">
        <Button disabled={!isValidNumber(price)}>
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

  const handleChange = (event: React.ChangeEvent<any>, name: string) => {
    const newValue = event.target.value;
    const lastChar = newValue.substring(newValue.length - 1);
    switch (name) {
      case "price" || "startingPrice":
        console.log("asasaa");
        if (newValue.match(/^(0*[1-9]\d*|0*[1-9]\d*\.\d+|0*\.\d+|0+)$/)) {
          setprice(+newValue);
        } else if (lastChar === "." && !newValue.substring(0, newValue.length - 1).includes(".")) setprice(newValue);
        else if (newValue === "") setprice(newValue);
        break;
      case "duration":
        console.log(newValue);
        setDuration(newValue);
        break;
      default:
        break;
    }
  };

  const handleToggle = (isOn: boolean) => {
    if (isTimedAuction) sethasStartingPrice(isOn);
    else setisPrivateSale(isOn);
  };

  const calculateReceivingAmount = () => {
    return price - (price * serviceFee) / 100 - (price * creatorEarnings) / 100;
  };

  useEffect(() => {
    console.log(isPrivateSale, hasStartingPrice, isTimedAuction);
  }, [isPrivateSale, hasStartingPrice, isTimedAuction]);

  /*TODO FIXED PRICEla TIMED AUCTIONi AYIR */
  /*TODO  SONRA DA Update Listing sayfasini da hallet*/

  return (
    <RightMenu title="List Your NFT" footer={footer} onBack={undefined}>
      <div className="flex flex-col gap-y-5">
        <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
          <img src={selectedNFT.image} width="64px" className="rounded-[5px] h-fit"></img>
          <div className="flex flex-col w-full">
            <div className="pb-[11px] border-b border-gray">{selectedNFT.name}</div>
          </div>
        </div>
        <Tab initTab={0} onChange={(value) => setisTimedAuction(!!value)}>
          <Tab.Item id={0}>
            <div className="flex justify-center items-center gap-x-[10px] -my-2">
              <IconListed width="17px" />
              FIXED PRICE
            </div>
          </Tab.Item>
          <Tab.Item id={1}>
            <div className="flex justify-center items-center gap-x-[10px] -my-2">
              <IconAuction width="17px" />
              TIMED AUCTION
            </div>
          </Tab.Item>
        </Tab>
        {isTimedAuction && (
          <div className="flex flex-col rounded-lg p-[15px] gap-y-[5px] text-head6 font-spaceGrotesk text-white bg-gray">
            Timed Auction
            <span className="text-bodySm text-gray-light">Lorem ipsum dolor sit amet.</span>
          </div>
        )}
        <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
          {isTimedAuction ? "Set Duration" : "Listing Duration"}
          <div className="flex gap-x-[5px] items-center text-bodySm text-gray-light">
            <IconInfo width="17px" /> Expiration at 12/12/2022 8:41 PM
          </div>
          <Dropdown options={["1 day", "3 days", "7 days", "1 month", "3 months", "6 months"]} onSelect={(event: any) => handleChange(event, "duration")} className="bg-bg-light text-bodyMd" />
        </div>
        <div className="flex flex-col text-head6 font-spaceGrotesk text-white gap-y-2">
          Enter Price*
          <PriceInput ref={refPriceInput} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event, "price")} value={price} type="text" />
          {price !== "" && price < selectedNFT.floorPrice && warning}
          <div className="flex text-bodyMd gap-x-2">
            <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.floorPrice)}>
              {selectedNFT.floorPrice} ETH - Floor Price
            </div>
            <div className="flex p-[10px] rounded-[5px] border border-gray cursor-pointer hover:bg-gray" onClick={() => setprice(selectedNFT.topTraitPrice)}>
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
              <div className="">5.5%</div>
            </div>
            <div className="flex w-full justify-between">
              <div className="text-gray-light">You’ll Recieve</div>
              <div className={`flex items-center ${isValidNumber(price) ? "text-green" : "text-gray-light"}`}>
                {isValidNumber(price) ? calculateReceivingAmount() : "-"} <IconEthereum />
              </div>
            </div>
          </div>
        </div>
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
            ? hasStartingPrice && (
                <PriceInput ref={refStartingPriceInput} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event, "startingPrice")} value={startingPrice} type="text" />
              )
            : isPrivateSale && <Input />}
        </div>
      </div>
    </RightMenu>
  );
};

export default ListNFT;
