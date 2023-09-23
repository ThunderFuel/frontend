import React from "react";
import clsx from "clsx";

import { IconDone, IconMilestone, IconSpinner, IconWarning } from "icons";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
  error = "error",
}

export const CheckoutProcessItem = ({ title, description, status = Status.notStarted, isLast = false }: { title: string; description: string; status: Status; isLast?: boolean }) => {
  const isPending = status === Status.pending;
  const isFailed = status === Status.error;

  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone className="text-white" />,
    [Status.error]: <IconWarning className="text-red shrink-0" />,
  };

  return (
    <div className="flex items-center gap-x-[22px]">
      <div className="flex h-full justify-start mt-1 text-white"> {icon[status]}</div>
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending || isFailed || (isLast && status === Status.done) ? "text-white" : "")}>{title}</div>
        <div
          className={clsx(
            "body-medium transition-all duration-300",
            isPending ? "h-[26px] opacity-100" : "h-0 opacity-0",
            isLast && (status === Status.done || status === Status.error) ? "h-auto opacity-100" : "h-0 opacity-0"
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
