import React from "react";
import { IconEthereum, IconInfo, IconTrash, IconWarning } from "icons";
import clsx from "clsx";

export interface CartItemProps {
  text: string;
  name: string;
  image: string;
  price: number;
  id: number;
  removeItem: (i: number) => void;
}
const CartItem = ({ text, name, image, price, id, removeItem }: CartItemProps) => {
  const warning = (text: string) => (
    <div className="flex border justify-center items-center border-gray rounded-[5px] w-fit p-1 ">
      {text === "Unavailable" ? (
        <IconWarning height="15px" width="15px" fill="red" />
      ) : (
        <IconInfo height="15px" width="15px" fill="#E69040" />
      )}
      <span
        className={clsx("font-spaceGrotesk text-bodyMd ml-1", text === "Unavailable" ? "text-red" : "text-[#E69040]")}
      >
        {text}
      </span>
    </div>
  );

  return (
    <>
      <div className="flex flex-col border border-gray p-[10px] rounded-md hover:bg-bg-light group">
        <div className="flex gap-[18px]">
          <div className="relative flex">
            <img src={image} className="min-h-[64px] min-w-[64px]"></img>
            {id === 3 ? <div className="absolute  h-[64px] w-[64px] bg-gray/80"></div> : <></>}
            <div className="absolute h-[64px] w-[64px] bg-gray/80 flex items-center justify-center opacity-0  group-hover:opacity-100">
              <IconTrash className="cursor-pointer" onClick={() => removeItem(id)} />
            </div>
          </div>
          <div className={clsx("flex flex-col w-full justify-between", id === 3 ? "text-gray-light" : "text-white")}>
            <div className="flex w-full text-head6 font-spaceGrotesk ">{name}</div>
            <div className="flex h-[1px] bg-gray"></div>
            <div className="flex w-full justify-between text-head6 font-spaceGrotesk">
              <span className="text-gray-light">{text}</span>
              <span className="flex items-center ">
                {price} <IconEthereum color="rgb(131,131,131)" />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-[82px]">
          {id === 2 ? warning("Price Change") : id === 3 ? warning("Unavailable") : <></>}
        </div>
      </div>
    </>
  );
};

export default CartItem;
