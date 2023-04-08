import React from "react";
import PageTitle from "./components/PageTitle";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputSwitch from "../../../../components/InputSwitch";

const Metadata = () => {
  return (
    <div className="flex flex-col gap-10 text-white max-w-[500px]">
      <PageTitle title="Set Metadata" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <div className="flex flex-col gap-7">
        <InputLabel label="IPFS URL*" helperText="The IPFS prefix of your metadata folder" />
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <Label helperText="Upload the image you want to have be the pre-reveal placeholder.">Set Pre-reveal Image</Label>
            <InputSwitch onChange={console.log} />
          </div>
          <UploadFile />
        </div>
      </div>
    </div>
  );
};

export default Metadata;
