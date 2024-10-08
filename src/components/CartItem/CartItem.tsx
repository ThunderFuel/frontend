import React from "react";
import { IconInfo, IconTrash, IconWarning } from "icons";
import clsx from "clsx";
import { remove } from "store/cartSlice";
import { useAppDispatch } from "store";
import EthereumPrice from "../EthereumPrice";

export interface CartItemProps {
  className?: string;
  text?: string;
  name: string;
  image: string;
  price?: number | string;
  id: number;
  titleSlot?: any;
  uid?: any;
  isRemovable?: boolean;
  onClick?: any;
  BottomPart?: any;
}

const CartItemStatus = ({ text }: { text: string }) => {
  const hasError = text === "Unavailable" || text === "Failed";

  return (
    <div className="flex border justify-center items-center border-gray rounded-[5px] w-fit p-1 ">
      {hasError ? <IconWarning className="w-4 h-4 fill-red" /> : <IconInfo className="w-4 h-4 text-orange" />}
      <span className={clsx("body-medium ml-1", hasError ? "text-red" : "text-orange")}>{text}</span>
    </div>
  );
};

const CartItemImage = ({ image, onRemove, isUnavailable, isRemovable }: { image: any; isUnavailable: boolean; onRemove: () => void; isRemovable?: boolean }) => {
  const images = Array.isArray(image) ? image : [image];

  const imagePosition: any = {
    1: "absolute left-2.5",
    2: "absolute left-5",
  };

  return (
    <div className="relative ">
      <div className={clsx(images.length > 1 && "w-20")}>
        {images.map((img: any, index) => {
          if (!img) return <div key={"null_image_" + index} className="w-16 h-16 top-0 bg-bg-light overflow-hidden rounded-md" />;

          return (
            <div className={clsx("h-16 w-16 top-0 overflow-hidden rounded-md", imagePosition[index] ?? "")} key={index}>
              <img alt={`image_${index}`} src={img} className={clsx("w-full")} />
            </div>
          );
        })}
      </div>
      {isUnavailable && <div className="absolute top-0 w-full h-full left-0 bg-gray/80" />}
      {isRemovable && (
        <div className="absolute top-0 left-0 flex-center h-16 w-16 bg-gray/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md">
          <IconTrash className="cursor-pointer text-white" onClick={onRemove} />
        </div>
      )}
    </div>
  );
};
const CartItem = ({ text, name, image, price, uid, className, titleSlot, isRemovable, onClick, BottomPart }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const onRemove = () => {
    dispatch(remove(uid));
  };
  const isUnavailable = false;
  const isPriceChange = false;
  const isFailed = false;

  const hasError = isUnavailable || isPriceChange || isFailed;

  return (
    <>
      <div className={clsx("flex flex-col border border-gray p-2.5 rounded-md hover:bg-bg-light group", className)}>
        <div className="flex items-start gap-[18px]">
          <CartItemImage image={image} isUnavailable={isUnavailable} onRemove={onRemove} isRemovable={isRemovable} />
          <div className={clsx("flex flex-col w-full", isUnavailable ? "text-gray-light" : "text-white")}>
            <div className="flex w-full justify-between border-b border-b-gray pb-2">
              <span className={`text-h6 text-white text-overflow ${onClick ? "cursor-pointer" : ""}`} onClick={onClick ?? ""}>
                {name}
              </span>
              {titleSlot}
            </div>
            {BottomPart ? (
              <div className="pt-2">{BottomPart}</div>
            ) : (
              <div className="flex w-full items-center justify-between text-h6 mt-2">
                <span className="text-gray-light">{text}</span>
                {text === "Address" ? <>{price}</> : price !== "" && text && <EthereumPrice priceClassName="text-h6" price={price} />}
              </div>
            )}
            {hasError && (
              <div className="mt-2">
                {isPriceChange && <CartItemStatus text={"Price Change"} />}
                {isUnavailable && <CartItemStatus text={"Unavailable"} />}
                {isFailed && <CartItemStatus text={"Failed"} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
