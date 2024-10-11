import React, { useMemo, useState } from "react";
import Balances from "components/Balances";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";
import Modal from "components/Modal";
import Tab from "components/Tab";
import InfoBox from "pages/NFTDetails/components/InfoBox";
import { useAppDispatch, useAppSelector } from "store";
import { toggleManageFundsModal } from "store/walletSlice";
import { IconAccept, IconDone, IconInfo, IconMinus, IconPlus, IconSpinner, IconSwap, IconWallet, IconWarning } from "icons";
import { useWallet } from "hooks/useWallet";
import config from "config";
import clsx from "clsx";
import { TransactionFailed, TransactionRejected } from "pages/Layout/CheckoutModal/MakeOfferCheckout";

const Footer = ({ show, onClose }: any) => {
  return (
    <div className="">
      {show ? (
        <div className={"flex w-full gap-2.5 items-center justify-center p-5"}>
          <Button className="btn-primary w-full tracking-widest" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const ManageFunds = () => {
  const dispatch = useAppDispatch();
  const { getBalance, handleDeposit, handleWithdraw, getBidBalance } = useWallet();
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const { manageFundsShow } = useAppSelector((state) => state.wallet);

  const [isAddToPool, setisAddToPool] = useState(true);
  const [amount, setAmount] = useState<any>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const balance = getBalance();
  const [bidBalance, setBidBalance] = useState<any>(0);

  const [isOnConfirmStep, setIsOnConfirmStep] = useState(false);
  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  function fetchBidBalance() {
    getBidBalance({ contractAddress: user.walletAddress, user: user })?.then((res) => {
      setBidBalance(res);
    });
  }

  async function handleSwap() {
    setIsDisabled(true);
    setIsOnConfirmStep(true);
    setStartTransaction(true);

    if (isAddToPool) {
      await handleDeposit({ wallet, amount, user, setIsDisabled, setStartTransaction, setIsFailed, setApproved });
    } else {
      await handleWithdraw({ wallet, amount, user, setIsDisabled, setStartTransaction, setIsFailed, setApproved });
    }
  }

  const footer = (
    <div className="flex flex-col items-center p-5 gap-2.5">
      <Button className="btn-secondary w-full">
        buy ETH <IconWallet />
      </Button>
      <a className="btn first-letter:btn-secondary w-full" href="https://bridge.linea.build/" target="_blank" rel="noreferrer">
        Bridge to Linea <IconSwap />
      </a>
    </div>
  );

  React.useEffect(() => {
    fetchBidBalance();

    return () => {
      setIsDisabled(false);
      setAmount(0);
    };
  }, [manageFundsShow]);

  React.useEffect(() => {
    fetchBidBalance();
  }, []);

  const renderBalances = useMemo(() => <Balances refresh={isDisabled} />, [isDisabled]);

  function onClose() {
    dispatch(toggleManageFundsModal());
    setIsDisabled(false);
    setIsOnConfirmStep(false);
    setStartTransaction(false);
    setApproved(false);
    setIsFailed(false);
  }

  return (
    <Modal
      backdropDisabled={isOnConfirmStep}
      bodyClassName="!w-full !max-w-[600px]"
      footer={config.getConfig("type") === "wagmi" ? footer : <Footer show={isOnConfirmStep && (approved || isFailed || !startTransaction)} onClose={onClose} />}
      onClose={onClose}
      show={manageFundsShow}
    >
      {isOnConfirmStep && (!startTransaction || isFailed) ? (
        <></>
      ) : (
        !approved && (
          <div className="flex w-full justify-between border-b border-gray text-h6">
            <span className={clsx("flex items-center gap-2.5 w-full p-5", isOnConfirmStep ? "text-gray-light" : "bg-bg-light border-b border-white text-white")}>
              {!isOnConfirmStep ? <IconWallet /> : <IconDone className="text-green" />} Manage Funds
            </span>

            <div className="flex-shrink-0 w-[1px] bg-gray" />

            <span className={clsx("flex items-center gap-2.5 w-full p-5", isOnConfirmStep ? "bg-bg-light border-b border-white text-white" : " text-gray-light")}>
              {approved ? <IconDone className="text-green" /> : <IconAccept />} Confirm Transaction
            </span>
          </div>
        )
      )}
      {isOnConfirmStep && !startTransaction ? (
        <TransactionRejected />
      ) : isOnConfirmStep && isFailed ? (
        <TransactionFailed />
      ) : approved ? (
        <div className="flex-center flex-col gap-8 py-[50px]">
          <IconDone className="w-10 h-10 text-green" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Funds Transferred Successfully!</h5>
            <span className="text-gray-light body-medium text-center">You can check your updated balance in the Wallet section.</span>
          </div>
        </div>
      ) : isOnConfirmStep ? (
        <div className="flex-center flex-col gap-8 px-[25px] py-[50px]">
          <IconSpinner className="animate-spin text-white w-10 h-10" />

          <div className="flex flex-col gap-2">
            <h5 className="text-h5 text-white text-center">Confirm in Wallet</h5>
            <span className="text-gray-light body-medium text-center">Waiting for you to confirm the transaction in your wallet.</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-5 gap-5">
          {renderBalances}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[15px]">
              <InfoBox title={""} description={"You can always add to your bid balance or withdraw from your bid balance without limitation."} />
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
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <h6 className="text-h6 text-white"> {isAddToPool ? "Add To Bid Balance" : "Withdraw from Bid Balance"}</h6>

                <span
                  className="cursor-pointer text-green text-bodyMedium"
                  onClick={() => {
                    if (isAddToPool) setAmount(balance);
                    else setAmount(bidBalance);
                  }}
                >
                  Max
                </span>
              </div>
              <InputEthereum onChange={(value: any) => setAmount(value)} value={amount} />
              {((isAddToPool && balance < amount) || (!isAddToPool && bidBalance < amount)) && (
                <div className="flex w-full items-center gap-x-[5px] text-red">
                  <IconWarning width="17px" />
                  <span className="text-bodySm font-spaceGrotesk">You don`t have enough funds.</span>
                </div>
              )}
              {!isAddToPool && (
                <div className="flex gap-[5px] rounded-[5px] text-orange">
                  <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" />
                  <span className="text-bodySm font-spaceGrotesk">Offers don`t cancel when you withdraw. Manage your offers in your profile.</span>
                </div>
              )}
              <Button
                disabled={isDisabled ? true : Number(amount) === 0 || amount === "" || (isAddToPool && balance < amount) || (!isAddToPool && bidBalance < amount)}
                className="btn-secondary w-full mt-[2px]"
                onClick={handleSwap}
              >
                {isAddToPool ? "DEPOSIT" : "WITHDRAW"}
                {isAddToPool ? <IconPlus className="w-6 h-6" /> : <IconMinus className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ManageFunds;
