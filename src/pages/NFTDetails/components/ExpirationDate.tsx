import Input from "components/Input";
import React from "react";

const ExpirationDate = () => {
  return (
    <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk">
      Set Expiration Date
      <Input containerClassName="bg-bg-light"></Input>
    </div>
  );
};

export default ExpirationDate;
