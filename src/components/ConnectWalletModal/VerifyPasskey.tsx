/* eslint-disable react/no-unescaped-entities */
import Button from "components/Button";
import { IconArrowRight, IconKey, IconSpinner } from "icons";
import React from "react";

const VerifyPasskey = ({ authenticate }: any) => {
  const [isRegister, setIsRegister] = React.useState<any>(undefined);

  async function handleAuthenticate() {
    try {
      await authenticate(isRegister);
      if (isRegister) setIsRegister(false);
    } catch (error) {
      setIsRegister(undefined);
    }
  }
  React.useEffect(() => {
    if (typeof isRegister === "boolean") {
      handleAuthenticate();
    }
  }, [isRegister]);

  //TODO : ERROR STATELERI YAPILACAK https://www.figma.com/file/Jrn6keHtX5nTW5CgvUnSgF/Thunder-NFT-Marketplace?type=design&node-id=8536-62054&mode=dev
  //TODO : passkey ile login olduktan sonra bizim backendden register olmali
  return (
    <div className="flex flex-col h-full p-5 gap-[15px] overflow-y-scroll no-scrollbar">
      {isRegister === undefined ? (
        <div className="flex flex-col gap-[90px]">
          <div className="flex flex-col gap-[5px]">
            <h5 className="text-head5 font-spaceGrotesk text-white">Use a passkey</h5>
            <span className="text-bodyMd text-gray-light font-spaceGrotesk">If you've logged in before, use your existing passkey. First-time login? Create a new passkey to get started!</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Button className="btn-secondary" onClick={() => setIsRegister(false)}>
              login with existing passkey <IconArrowRight className="w-[18px] h-[18px]" />
            </Button>
            <Button className="btn-secondary" onClick={() => setIsRegister(true)}>
              create a new passkey <IconKey className="w-[18px] h-[18px]" />
            </Button>
          </div>
        </div>
      ) : isRegister === true ? (
        <div className="flex flex-col gap-[90px]">
          <div className="flex flex-col gap-[5px]">
            <h5 className="text-head5 font-spaceGrotesk text-white">Crate a new passkey</h5>
            <span className="text-bodyMd text-gray-light font-spaceGrotesk">Please follow the prompts to create a new passkey.</span>
          </div>
          <div className="flex flex-center w-full h-40 rounded border border-gray">
            <IconSpinner className="animate-spin text-white" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[90px]">
          <div className="flex flex-col gap-[5px]">
            <h5 className="text-head5 font-spaceGrotesk text-white">Login with existing passkey</h5>
            <span className="text-bodyMd text-gray-light font-spaceGrotesk">Please follow the prompts to login.</span>
          </div>
          <div className="flex flex-center w-full h-40 rounded border border-gray">
            <IconSpinner className="animate-spin text-white" />
          </div>
        </div>
      )}
      <div className="mt-auto">
        <span className="text-bodyMd text-gray-light">
          By connecting your wallet, you agree to our <u className="text-white cursor-pointer">Terms of Service</u> and our <u className="text-white cursor-pointer">Privacy Policy.</u>
        </span>
      </div>
    </div>
  );
};

export default VerifyPasskey;
