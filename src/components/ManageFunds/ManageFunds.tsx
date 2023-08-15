import React, { useMemo, useState } from "react";
import Balances from "components/Balances";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";
import Modal from "components/Modal";
import Tab from "components/Tab";
import InfoBox from "pages/NFTDetails/components/InfoBox";
import { useAppDispatch, useAppSelector } from "store";
import { toggleManageFundsModal } from "store/walletSlice";
import { ZERO_B256, assetManagerContractId, poolContractId, provider } from "global-constants";
import { toGwei } from "utils";
import { deposit, withdraw } from "thunder-sdk/src/contracts/pool";
import userService from "api/user/user.service";
import { IconInfo, IconMinus, IconPlus, IconSwap, IconWallet, IconWarning } from "icons";
import { useWallet } from "hooks/useWallet";

const ManageFunds = () => {
  const dispatch = useAppDispatch();
  const { getBalance } = useWallet();
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { manageFundsShow } = useAppSelector((state) => state.wallet);

  const [isAddToPool, setisAddToPool] = useState(true);
  const [amount, setAmount] = useState<any>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [balance, setbalance] = useState<any>(0);
  const [bidBalance, setBidBalance] = useState<any>(0);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }
  function fetchBidBalance() {
    userService.getBidBalance(user.id).then((res) => setBidBalance(res.data ? res.data : 0));
  }

  function handleSwap() {
    setIsDisabled(true);
    if (isAddToPool)
      deposit(poolContractId, provider, wallet, toGwei(amount).toNumber(), ZERO_B256, assetManagerContractId)
        .then(() => {
          userService.updateBidBalance(user.id, amount).then(() => setIsDisabled(false));
        })
        .catch((e) => {
          console.log(e);
          setIsDisabled(false);
        });
    else
      withdraw(poolContractId, provider, wallet, toGwei(amount).toNumber(), ZERO_B256, assetManagerContractId)
        .then(() => {
          userService.updateBidBalance(user.id, -amount).then(() => setIsDisabled(false));
        })
        .catch((e) => {
          console.log(e);
          setIsDisabled(false);
        });
  }

  const footer = (
    <div className="flex flex-col items-center p-5 gap-y-5">
      <Button className="btn-secondary w-full">
        buy ETH <IconWallet />
      </Button>
      <Button className="btn-secondary w-full">
        Bridge to Linea <IconSwap />
      </Button>
    </div>
  );

  React.useEffect(() => {
    return () => {
      setIsDisabled(false);
      setAmount(0);
    };
  }, [manageFundsShow]);

  React.useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, []);

  const renderBalances = useMemo(() => <Balances refresh={isDisabled} />, [isDisabled]);

  return (
    <Modal className="checkout" title="Manage Funds" footer={footer} onClose={() => dispatch(toggleManageFundsModal())} show={manageFundsShow}>
      <div className="flex flex-col p-5 gap-5">
        {renderBalances}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[15px]">
            <Tab className="bg-gray" initTab={0} onChange={(value) => setisAddToPool(!value)}>
              <Tab.Item id={0}>
                <div className="flex justify-center items-center gap-2.5 -my-1">
                  <IconPlus className="w-5 h-5" /> Deposit
                </div>
              </Tab.Item>
              <Tab.Item id={1}>
                <div className="flex justify-center items-center gap-2.5 -my-1">
                  <IconMinus className="w-5 h-5" />
                  Withdraw
                </div>
              </Tab.Item>
            </Tab>
            <InfoBox title={""} description={"You can always add to your bid balance or withdraw from your bid balance without limitation."} />
          </div>
          <div className="flex flex-col gap-y-2">
            <h6 className="text-h6 text-white"> {isAddToPool ? "Add To Bid Balance" : "Withdraw from Bid Balance"}</h6>
            <InputEthereum onChange={(value: any) => setAmount(value)} value={amount} />
            {((isAddToPool && balance < toGwei(amount)) || (!isAddToPool && bidBalance < amount)) && (
              <div className="flex w-full items-center gap-x-[5px] text-red">
                <IconWarning width="17px" />
                <span className="text-bodySm font-spaceGrotesk">You don`t have enough funds.</span>
              </div>
            )}
            {!isAddToPool && (
              <div
                className="flex gap-[5px] rounded-[5px] text-orange
              "
              >
                <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" /> <span className="text-bodySm">Offers don`t cancel when you withdraw. Manage your offers in your profile.</span>
              </div>
            )}
            <Button
              disabled={isDisabled ? true : amount === 0 || amount === "" || typeof amount === "string" ? true : (isAddToPool && balance < toGwei(amount)) || (!isAddToPool && bidBalance < amount)}
              className="btn-secondary w-full mt-[2px]"
              onClick={handleSwap}
            >
              {isAddToPool ? "DEPOSIT" : "WITHDRAW"}
              {isAddToPool ? <IconPlus className="w-6 h-6" /> : <IconMinus className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ManageFunds;
