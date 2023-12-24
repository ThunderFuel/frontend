import Input from "components/Input";
import React from "react";

const ChooseUsername = () => {
  return (
    <div className="flex flex-col h-full p-5 gap-[15px] overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[5px]">
          <h5 className="text-head5 font-spaceGrotesk text-white">Welcome! Let’s choose you an username</h5>
          <span className="text-bodyMd text-gray-light font-spaceGrotesk">Your profile will be available on thunder.marketplace/[username]</span>
        </div>
        <div className="flex items-center gap-2.5 border border-gray rounded-lg py-2.5 px-5">
          <span className="text-bodyMd text-white">@</span>
          <Input maxLength={25} placeholder="Choose a username" containerClassName="border-none !p-0" className="text-bodyMd" />
        </div>
      </div>
      <div className="mt-auto">
        <span className="text-bodyMd text-gray-light">
          By connecting your wallet, you agree to our <u className="text-white cursor-pointer">Terms of Service</u> and our <u className="text-white cursor-pointer">Privacy Policy.</u>
        </span>
      </div>
    </div>
  );
};

export default ChooseUsername;
