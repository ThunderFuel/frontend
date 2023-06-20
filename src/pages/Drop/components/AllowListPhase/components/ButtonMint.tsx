import React, { useState } from "react";
import { useAppSelector } from "store";
import Button from "components/Button";
import { IconMinus, IconPlus, IconToken } from "icons";
import { useDispatch } from "react-redux";
import { toggleWalletModal } from "store/walletSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const InputMint = ({ onChange, walletCount }: any) => {
  const [value, setValue] = useState(1);
  const onUpdateValue = (number: number) => {
    const val = value + number;
    if (val < 1 || val > walletCount) {
      return false;
    }

    setValue(val);
    onChange(val);
  };

  return (
    <div className="flex items-center border border-white border-opacity-10 rounded-md">
      <h3 className="w-16 text-center text-h3 border-r border-r-white border-opacity-10 py-1">{value}</h3>
      <div className="flex flex-col items-center">
        <span className="cursor-pointer px-5 py-1 border-b border-b-white border-opacity-10" onClick={() => onUpdateValue(1)}>
          <IconPlus className={value >= walletCount ? "opacity-50" : ""} />
        </span>
        <span className="cursor-pointer px-5 py-1" onClick={() => onUpdateValue(-1)}>
          <IconMinus className={value <= 1 ? "opacity-50" : ""} />
        </span>
      </div>
    </div>
  );
};

const ButtonMint = ({ walletCount, mintImage }: { walletCount: number; mintImage: string }) => {
  const { isConnected } = useAppSelector((state) => state.wallet);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const onClick = () => {
    if (!isConnected) dispatch(toggleWalletModal());
    else {
      dispatch(
        setCheckout({
          type: CheckoutType.MintCheckout,
          mintAmount: amount,
          mintImage: mintImage,
        })
      );
      dispatch(toggleCheckoutModal());
    }
  };

  const onChange = (e: any) => setAmount(e);

  return (
    <div className="flex gap-2">
      {walletCount > 1 ? <InputMint onChange={onChange} walletCount={walletCount} /> : null}
      <Button className="w-full btn-primary" onClick={onClick}>
        Mint now <IconToken />
      </Button>
    </div>
  );
};

export default ButtonMint;
