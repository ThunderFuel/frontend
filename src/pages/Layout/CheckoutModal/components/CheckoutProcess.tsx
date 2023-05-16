import { IconWarning } from "icons";
import React, { useEffect, useState } from "react";
import { CheckoutProcessItem } from "./CheckoutProcessItem";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
}

export const CheckoutProcess = ({ onComplete, data, approved }: { onComplete: () => any; data: any; approved: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title1, title2, title3, description1, description2, description3 } = data;
  const [transactionStatus, setTransactionStatus] = useState({
    // confirmTransaction: Status.pending,
    waitingForApproval: Status.pending,
    purchaseConfirm: Status.notStarted,
  });
  const [partiallyFailed, setPartiallyFailed] = useState(false);

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

    if (approved) {
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
    setPartiallyFailed(false);
    startTransactionProcess();
  }, [approved]);

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col p-5 gap-y-[25px]  border-gray">
        {/* <CheckoutProcessItem status={transactionStatus.confirmTransaction} title={title1} description={description1} /> */}
        <CheckoutProcessItem status={transactionStatus.waitingForApproval} title={title2} description={description2} />
        <CheckoutProcessItem status={transactionStatus.purchaseConfirm} title={title3} description={description3} />

        {partiallyFailed && (
          <div className="flex justify-center gap-x-2 p-2.5 border bg-bg-light border-gray rounded-[5px]">
            <div className="flex">
              <IconWarning className="fill-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-h6 text-white">1 item failed</span>
              <span className="body-small text-gray-light">Purchases can fail due to network issues, gas fee increases, or because someone else bought the item before you.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
