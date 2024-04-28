import InputContainer from "pages/Beta/components/Input";
import React from "react";

const VerifyEmail = ({ email, error, setError, authenticate, sendPasscode }: any) => {
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    if (code.length === 0) setError(false);
    if (code.length === 6) authenticate(code);
  }, [code]);

  return (
    <div className="flex flex-col h-full p-5 gap-[15px] overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[5px]">
          <h5 className="text-head5 font-spaceGrotesk text-white">Verify your email</h5>
          <span className="text-bodyMd text-gray-light font-spaceGrotesk">Please check {email} for an email and enter your code below.</span>
        </div>
        <div className="flex flex-col gap-[15px]">
          <InputContainer error={error} inputClassName="email" onChangeContainer={(value: any) => setCode(value)} />
          <span className="text-bodyMd font-spaceGrotesk text-gray-light">
            Didn’t you get a email?{" "}
            <u className="cursor-pointer text-white" onClick={() => sendPasscode()}>
              Resend Code
            </u>
          </span>
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

export default VerifyEmail;
