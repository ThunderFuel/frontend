import React, { useEffect, useState } from "react";
import { CheckoutProcessItem } from "./CheckoutProcessItem";
import config from "config";
import { IconInfo } from "icons";
import { formatEther } from "viem";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
  error = "error",
}

export const notNeededStepIds = ["currency-approval"];

export function handleTransactionError({ error, setStartTransaction, setIsFailed }: { error: any; setStartTransaction: (bool: boolean) => void; setIsFailed: (bool: boolean) => void }) {
  console.log(error);
  if (
    error.message.includes("User denied transaction signature.") ||
    error.message.includes("Request cancelled without user response!") ||
    error.message.includes("Error: User rejected the transaction!") ||
    error.message.includes("An unexpected error occurred")
  ) {
    setStartTransaction(false);
  } else {
    setIsFailed(true);
  }
}

export const CheckoutProcess = ({
  stepData,
  wagmiSteps = [],
  onComplete,
  data,
  approved,
  failed,
}: {
  stepData?: any;
  wagmiSteps?: any;
  onComplete: () => any;
  data: any;
  approved: any;
  failed: any;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title1, title2, title3, description1, description2, description3 } = data;
  const errorTitle = "Transaction failed";
  const errorDescription = "Transactions can fail due to network issues, gas fee increases, or because someone else bought the item before you.";
  const [transactionStatus, setTransactionStatus] = useState({
    // confirmTransaction: Status.pending,
    waitingForApproval: Status.pending,
    purchaseConfirm: Status.notStarted,
  });
  const [partiallyFailed, setPartiallyFailed] = useState(false);
  const type = config.getConfig("type");
  const isWagmi = type === "wagmi";

  const onSetTransactionStatus = (state: any) => {
    setTransactionStatus((prevState) => ({
      ...prevState,
      ...state,
    }));
  };
  const startTransactionProcess = async () => {
    // const confirmTransaction = (await mockTransaction()) as Status;
    // onSetTransactionStatus({
    //   confirmTransaction,
    //   waitingForApproval: Status.pending,
    // });

    if (approved || failed) {
      const waitingForApproval = Status.done;
      const purchaseConfirm = Status.done;
      onSetTransactionStatus({
        waitingForApproval,
        purchaseConfirm,
      });

      return;
    } else {
      const waitingForApproval = transactionStatus.waitingForApproval;
      onSetTransactionStatus({
        waitingForApproval,
      });
    }
    onComplete();
  };

  useEffect(() => {
    if (!failed) {
      setPartiallyFailed(false);
    } else setPartiallyFailed(true);
    startTransactionProcess();
  }, [approved, failed]);

  function hasPreviousIncompleteStep(idx: number) {
    for (let index = 0; index < idx; index++) {
      if (wagmiSteps[index]?.items[0].status === "incomplete") return true;
    }

    return false;
  }

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col p-5 gap-y-[25px] border-gray">
        {/* <CheckoutProcessItem status={transactionStatus.confirmTransaction} title={title1} description={description1} /> */}
        {wagmiSteps.length > 0 ? (
          <>
            {wagmiSteps.map((step: any, idx: number) => {
              if (notNeededStepIds.includes(step.id) && step.items[0].status === "complete") return;
              else
                return (
                  <CheckoutProcessItem
                    key={`CheckoutProcessItem${idx}`}
                    status={!hasPreviousIncompleteStep(idx) ? (step.items[0].status === "incomplete" ? Status.pending : Status.done) : Status.notStarted}
                    title={step.action}
                    description={step.description}
                  />
                );
            })}
            <CheckoutProcessItem isLast={true} status={stepData?.currentStepItem?.status === "complete" ? Status.done : Status.notStarted} title={title3} description={description3} />
            {wagmiSteps.filter((step: any) => step.id === "currency-wrapping").length > 0 && approved && (
              <div className="flex gap-2 w-full p-2.5 border border-gray bg-bg-light rounded-[5px]">
                <IconInfo className="text-orange" />
                <div className="flex flex-col w-full gap-[5px]">
                  <h6 className="text-h6 text-white">
                    {formatEther(BigInt(parseInt(wagmiSteps.filter((step: any) => step.id === "currency-wrapping")[0].items[0].data.value, 16)))} ETH added to bid your balance.
                  </h6>
                  <span className="body-small text-gray-light">
                    In order to make this offer {formatEther(BigInt(parseInt(wagmiSteps.filter((step: any) => step.id === "currency-wrapping")[0].items[0].data.value, 16)))} ETH converted into wETH.
                    You can always view and withdraw wETH from your bid balance.
                  </span>
                </div>
              </div>
            )}
          </>
        ) : isWagmi ? (
          <></>
        ) : (
          <>
            <CheckoutProcessItem status={transactionStatus.waitingForApproval} title={title2} description={description2} />
            <CheckoutProcessItem
              status={partiallyFailed ? Status.error : transactionStatus.purchaseConfirm}
              title={partiallyFailed ? errorTitle : title3}
              description={partiallyFailed ? errorDescription : description3}
              isLast={true}
            />
          </>
        )}
        {/* {partiallyFailed && (
          <div className="flex justify-center gap-x-2 p-2.5 border bg-bg-light border-gray rounded-[5px]">
            <div className="flex">
              <IconWarning className="text-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-h6 text-white">Transaction failed</span>
              <span className="body-small text-gray-light">Transactions can fail due to network issues, gas fee increases, or because someone else bought the item before you.</span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
