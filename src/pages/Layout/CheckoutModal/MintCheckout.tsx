import React, { useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Modal from "components/Modal";

import { IconWarning } from "icons";
import { useAppSelector } from "store";
import { CheckoutProcess } from "./components/CheckoutProcess";
import { contracts, provider } from "global-constants";
import { setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { FuelProvider } from "../../../api";
import { mint } from "thunder-sdk/src/contracts/erc721";
import collectionsService from "api/collections/collections.service";
import UseNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const checkoutProcessTexts = {
  title1: "Confirm cancelling your offer",
  description1: "Proceed in your wallet and confirm cancelling offer",
  title2: "Wait for approval",
  description2: "Waiting for transaction to be approved",
  title3: "Minted!",
  description3: "Congrats, you successfully minted.",
};

const Footer = ({ approved, onClick, onClose }: { approved: boolean; onClick: any; onClose: any }) => {
  return (
    <div className={clsx("transition-all duration-300 overflow-hidden", approved ? "h-[96px] opacity-100" : "h-0 opacity-0")}>
      <div className={"flex-center flex-col w-full p-5 gap-5"}>
        <Button
          className="w-full tracking-widest text-black"
          onClick={() => {
            onClose();
            onClick();
          }}
        >
          VIEW NFT
        </Button>
      </div>
    </div>
  );
};

const MintCheckout = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { checkoutMintAmount, checkoutMintImage, onCheckoutComplete, checkoutMintContractAddress } = useAppSelector((state) => state.checkout);
  const { wallet, user } = useAppSelector((state) => state.wallet);
  const navigate = UseNavigate();

  const [approved, setApproved] = useState(false);
  const [startTransaction, setStartTransaction] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const contractAddress = checkoutMintContractAddress;

  const [mintedNFT, setMintedNFT] = useState({} as any);

  const onComplete = () => {
    setContracts(contracts, FuelProvider);
    mint(contractAddress, provider, wallet, checkoutMintAmount, user.walletAddress, false)
      .then((res) => {
        console.log(res);
        if (res?.transactionResult.status.type === "success") {
          const _tokenIds = res.logs.map((item) => item.token_id.toNumber());
          collectionsService
            .mint({
              contractAddress,
              walletAddress: user.walletAddress,
              tokenIds: _tokenIds,
            })
            .then((res) => {
              setMintedNFT(res.data.tokens[0]);
              setApproved(true);
              onCheckoutComplete();
            });
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("Request cancelled without user response!") || e.message.includes("Error: User rejected the transaction!") || e.message.includes("An unexpected error occurred"))
          setStartTransaction(false);
        else setIsFailed(true);
      });
  };

  React.useEffect(() => {
    setApproved(false);
    setStartTransaction(false);
    if (show) {
      setStartTransaction(true);
    }
  }, [show]);

  const clickViewNft = () => {
    navigate(PATHS.NFT_DETAILS, { nftId: mintedNFT.id });
  };

  const checkoutProcess = (
    <div className="flex flex-col w-full items-center">
      {startTransaction ? (
        <>
          <CheckoutProcess onComplete={onComplete} data={checkoutProcessTexts} approved={approved} failed={isFailed} />
          {isFailed && (
            <div className="flex flex-col w-full border-t border-gray">
              <Button className="btn-secondary m-5" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full border-t border-gray">
          <div className="flex w-full items-center gap-x-5 p-5 border-b border-gray">
            <IconWarning className="text-red" />
            <span className="text-h5 text-white">You rejected the request in your wallet!</span>
          </div>
          <Button className="btn-secondary m-5" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal backdropDisabled={true} className="checkout" title="Mint" show={show} onClose={onClose} footer={<Footer approved={approved} onClick={clickViewNft} onClose={onClose} />}>
      <div className="flex border-t border-gray">{checkoutProcess}</div>
      {approved && (
        <div className="p-5 border-t border-gray">
          <img src={checkoutMintImage} className="rounded-md object-cover w-full max-h-[440px]" />
        </div>
      )}
    </Modal>
  );
};

export default MintCheckout;
