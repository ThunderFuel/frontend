import React, { useState } from "react";
import { useAppSelector } from "store";
import { mint } from "thunder-sdk/src/contracts/erc721";
import { ERC721ContractId, provider } from "global-constants";
import collectionsService from "api/collections/collections.service";
import Button from "components/Button";
import { IconMinus, IconPlus, IconToken } from "icons";

const InputMint = ({ onChange }: any) => {
  const [value, setValue] = useState(1);
  const onUpdateValue = (number: number) => {
    const val = value + number;
    if (val < 1 || val > 5) {
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
          <IconPlus className={value === 5 ? "opacity-50" : ""} />
        </span>
        <span className="cursor-pointer px-5 py-1" onClick={() => onUpdateValue(-1)}>
          <IconMinus className={value === 1 ? "opacity-50" : ""} />
        </span>
      </div>
    </div>
  );
};

const ButtonMint = () => {
  const { user, wallet } = useAppSelector((state) => state.wallet);
  const [amount, setAmount] = useState(1);

  const tempContract = "0x3cf27804d6a1c653dcce062b6f33937a815ee7ae7471787b3c0a661c22d45947";
  const onClick = () => {
    mint(ERC721ContractId, provider, wallet, amount, user.walletAddress)
      .then((res) => {
        console.log(res);
        if (res?.transactionResult.status.type === "success") {
          const _tokenIds = res.logs.map((item) => item.token_id.toNumber()); //logs

          collectionsService
            .mint({
              contractAddress: tempContract,
              count: amount,
              walletAddress: user.walletAddress,
              tokenIds: _tokenIds,
            })
            .then((res) => console.log("MINTED", res));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChange = (e: any) => setAmount(e);

  return (
    <div className="flex gap-2">
      <InputMint onChange={onChange} />
      <Button className="w-full btn-primary" onClick={onClick}>
        Mint now <IconToken />
      </Button>
    </div>
  );
};

export default ButtonMint;
