import React from "react";
import clsx from "clsx";

import { IconDone, IconMilestone, IconSpinner } from "icons";

enum Status {
  notStarted = "notStarted",
  pending = "pending",
  done = "done",
}

export const CheckoutProcessItem = ({ title, description, status = Status.notStarted }: { title: string; description: string; status: Status }) => {
  const isPending = status === Status.pending;
  const icon: any = {
    [Status.notStarted]: <IconMilestone className="stroke-gray" />,
    [Status.pending]: <IconSpinner className="animate-spin" />,
    [Status.done]: <IconDone />,
  };

  return (
    <div className="flex items-center gap-x-[22px]">
      {icon[status]}
      <div className="flex flex-col text-gray-light gap-2">
        <div className={clsx("text-h5 transition-all duration-300", isPending && "text-white")}>{title}</div>
        <div className={clsx("body-medium transition-all duration-300 overflow-hidden", isPending ? "h-5 opacity-100" : " h-0 opacity-0")}>{description}</div>
      </div>
    </div>
  );
};
