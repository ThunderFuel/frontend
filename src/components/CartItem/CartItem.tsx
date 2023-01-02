import React, { Dispatch, SetStateAction } from "react";
import { IconEthereum, IconInfo, IconTrash, IconWarning } from "icons";
import clsx from "clsx";
import { remove } from "store/cartSlice";
import { useAppDispatch } from "store";

export interface CartItemProps {
  className?: string;
  text: string;
  name: string;
  image: string;
  price: number;
  id: number;
  checkoutMultipleImages?: string[];
  showDetails?: boolean;
  setShowDetails?: Dispatch<SetStateAction<boolean>>;
}
const CartItem = ({ text, name, image, price, id, checkoutMultipleImages, className, showDetails, setShowDetails }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const warning = (text: string) => (
    <div className="flex border justify-center items-center border-gray rounded-[5px] w-fit p-1 ">
      {text === "Unavailable" || text === "Failed" ? <IconWarning height="15px" width="15px" fill="red" /> : <IconInfo height="15px" width="15px" fill="#E69040" />}
      <span className={clsx("font-spaceGrotesk text-bodyMd ml-1", text === "Unavailable" || text === "Failed" ? "text-red" : "text-[#E69040]")}>{text}</span>
    </div>
  );

  return (
    <>
      <div className={clsx("flex flex-col border border-gray p-[10px] rounded-md hover:bg-bg-light group", className ? className : "")}>
        <div className="flex gap-[18px]">
          <div className="relative flex">
            {checkoutMultipleImages ? (
              <div className="flex w-[84px]">
                {checkoutMultipleImages.map((img, index) => {
                  return <img key={index} src={img} className={clsx("min-h-[64px] min-w-[64px]", index === 1 ? "absolute left-[10px]" : index === 2 ? "absolute left-5" : "")}></img>;
                })}
              </div>
            ) : (
              <>
                <img src={image} className="min-h-[64px] min-w-[64px]"></img>
                {id === 9 ? <div className="absolute h-[64px] w-[64px] bg-gray/80"></div> : <></>}
                <div className="absolute h-[64px] w-[64px] bg-gray/80 flex items-center justify-center opacity-0  group-hover:opacity-100">
                  <IconTrash className="cursor-pointer" onClick={() => dispatch(remove(id))} />
                </div>
              </>
            )}
          </div>
          <div className={clsx("flex flex-col w-full justify-between", id === 9 ? "text-gray-light" : "text-white")}>
            <div className="flex w-full justify-between font-spaceGrotesk ">
              <span className="text-head6 text-white">{name}</span>
              {checkoutMultipleImages && setShowDetails ? (
                <div className="flex gap-x-[10px]">
                  <button className="text-bodySm text-gray-light underline">View on Blockchain</button>
                  <button className="text-bodySm text-gray-light underline" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex h-[1px] bg-gray"></div>
            <div className="flex w-full justify-between text-head6 font-spaceGrotesk">
              <span className="text-gray-light">{text}</span>
              <span className="flex items-center ">
                {price} <IconEthereum color="rgb(131,131,131)" />
              </span>
            </div>
          </div>
        </div>
        {[8, 9, 20].includes(id) && <div className="mt-2 ml-[82px]">{id === 8 ? warning("Price Change") : id === 9 ? warning("Unavailable") : id === 20 ? warning("Failed") : <></>}</div>}
      </div>
    </>
  );
};

export default CartItem;
