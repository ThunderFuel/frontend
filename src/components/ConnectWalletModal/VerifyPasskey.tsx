import React from "react";

const VerifyPasskey = ({ authenticate }: any) => {
  React.useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className="flex flex-col h-full p-5 gap-[15px] overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[5px]">
          <h5 className="text-head5 font-spaceGrotesk text-white">Create a credential</h5>
          <span className="text-bodyMd text-gray-light font-spaceGrotesk">Please follow the prompts to create a credential.</span>
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

export default VerifyPasskey;
