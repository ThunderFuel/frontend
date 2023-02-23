import React from "react";
import { toast } from "react-toastify";
import { IconClose, IconDone, IconTriangleInfo } from "../icons";

const toastOptions = {
  className: "toast",
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  progressClassName: "toast-process",
  closeButton: () => (
    <div className="flex-center">
      <IconClose className="text-gray-light" />
    </div>
  ),
};

export default () => {
  return {
    success: (message: string, options: any = {}) => {
      toast.success(message, {
        ...{ icon: () => <IconDone className="text-green" /> },
        ...toastOptions,
        ...options,
      });
    },
    error: (message: string, options: any = {}) => {
      toast.error(message, {
        ...{ icon: () => <IconTriangleInfo className="text-red" /> },
        ...toastOptions,
        ...options,
      });
    },
    warning: (message: string, options: any = {}) => {
      toast.warning(message, {
        ...toastOptions,
        ...options,
      });
    },
    info: (message: string, options: any = {}) => {
      toast.info(message, {
        ...toastOptions,
        ...options,
      });
    },
  };
};
