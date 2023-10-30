import React, { useMemo } from "react";
import clsx from "clsx";

import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";
import { isObjectEmpty } from "utils";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
  error = "error",
}

export const CheckoutProcessItem = ({
  title,
  description,
  status = Status.notStarted,
  isLast = false,
  stepItems,
  bulkItems,
}: {
  title: string;
  description: string;
  status: Status;
  isLast?: boolean;
  stepItems?: any;
  bulkItems?: any;
}) => {
  const isPending = status === Status.pending;
  const isFailed = status === Status.error;

  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone className="text-white" />,
    [Status.error]: <IconWarning className="text-red shrink-0" />,
  };

  const currentItem = useMemo(() => {
    if (!stepItems || !bulkItems) return {};
    let _currentItem = {} as any;

    const _stepItem = stepItems?.find((step: any) => step.status === "incomplete");
    if (_stepItem === undefined) return {};

    let _bulkItem = bulkItems?.find((item: any) => item.collection === _stepItem.data.to);
    if (_bulkItem === undefined) return;
    _bulkItem = { ..._bulkItem, status: _stepItem.status };
    _currentItem = _bulkItem;

    return _currentItem;
  }, [stepItems, bulkItems]);

  return (
    <div className="flex items-center gap-x-[22px]">
      <div className="flex h-full justify-start mt-1 text-white"> {icon[status]}</div>
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending || isFailed || (isLast && status === Status.done) ? "text-white" : "")}>{title}</div>
        <div
          className={clsx(
            "body-medium transition-all duration-300",
            isPending ? (!isObjectEmpty(currentItem) ? "h-[106px] opacity-100" : "h-[26px] opacity-100") : "h-0 opacity-0",
            isLast && (status === Status.done || status === Status.error) ? "h-auto opacity-100" : "h-0 opacity-0"
          )}
        >
          {description}
          {!isObjectEmpty(currentItem) && (
            <div className="flex justify-between items-center p-2.5 rounded-md border border-gray mt-2.5" key={currentItem?.collection}>
              <div className="flex gap-2.5">
                <img src={currentItem?.image} className="h-12 w-12 rounded-md" />
                <h6 className="text-h6 text-white font-spaceGrotesk">{currentItem?.name}</h6>
              </div>
              <h6 className="text-h6 font-spaceGrotesk text-black text-center bg-white px-2.5 rounded-full">
                {stepItems?.findIndex((item: any) => item?.data?.to === currentItem.collection) + 1}/{stepItems?.length}
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
