import React from "react";
import ModalBase from "./ModalBase";
import { IconInfo } from "icons";
import InputLabel from "components/InputLabel";

const ModalChangeBackgroundColor = (props: any) => {
  return (
    <ModalBase {...props} title="Change Background Color" footer={<ModalBase.Footer />}>
      <div className="flex flex-col gap-6 text-white">
        <div className="p-4 bg-gray rounded-md flex gap-5 items-start">
          <IconInfo className="text-white w-6 h-6" />
          <span className="body-medium text-gray-light flex-1">
            You can customize the background color of your drop page to match your brand. It’s important to consider that the color contrast ratio to maintain the page&#39;s readability.
          </span>
        </div>
        <InputLabel label="Select Background Color*" />
      </div>
    </ModalBase>
  );
};

export default ModalChangeBackgroundColor;
