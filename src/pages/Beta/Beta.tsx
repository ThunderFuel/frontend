import React from "react";
import { IconArrowRight, IconInfo } from "icons";
import Img from "components/Img";
import { AssetBetaLogin } from "assets";
import Button from "components/Button";
import InputContainer from "./components/Input";
import Header from "../Landing/Header";
import useAuthToken from "hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import authService from "api/auth/auth.service";
import useToast from "hooks/useToast";
import { useDispatch } from "react-redux";
import { toggleClosedBetaModal } from "store/commonSlice";

const Beta = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = React.useState("");
  const onSubmit = async () => {
    try {
      const response = await authService.generatetoken({ code });
      useAuthToken.setAuthTokenFromLocalStorage(response.data);
      navigate(0);
      dispatch(toggleClosedBetaModal());
    } catch (e: any) {
      useToast().error(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col text-white">
        <div className="max-w-[1118px] m-auto">
          <div className="border-x border-gray py-16 px-10" style={{ minHeight: "calc(100vh - 67px)" }}>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-h2">Closed Beta Login</h2>
                  <div className="body-medium text-gray-light">
                    Thunder team has been working around the clock for the last few weeks designing, developing, and fine-tuning Thunder Marketplace and we’re excited to finally welcome you to our
                    closed beta!
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-12">
                  <h6 className="text-h6">Access Code</h6>
                  <div className="flex items-center body-small text-gray-light">
                    <IconInfo />
                    Please enter your access code
                  </div>
                  <div className="flex flex-col gap-y-[25px]">
                    <InputContainer onChangeContainer={(value: any) => setCode(value)} />
                    <Button className="btn-secondary w-full" disabled={code.length < 6} onClick={onSubmit}>
                      Login <IconArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Img src={AssetBetaLogin} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Beta;
