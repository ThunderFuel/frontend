import React from "react";
import Modal from "components/Modal";
import { AssetBetaBulkListing, AssetBetaSingleCheckout, AssetBetaSweep, AssetBetaWallet } from "assets";
import Button from "components/Button";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { toggleClosedBetaModal } from "store/commonSlice";

const ClosedBetaModal = () => {
  const dispatch = useDispatch();
  const { getItem, setItem } = useLocalStorage();
  // const firstLogin = getItem("firstLogin");
  const [firstToggle, setfirstToggle] = React.useState(false);
  const { showClosedBetaModal } = useAppSelector((state) => state.common);
  const [show, setShow] = React.useState(showClosedBetaModal);

  const features = [
    { title: "Single Checkout", descriptiom: "Purchase NFTs from different collections with one transaction.", image: AssetBetaSingleCheckout },
    { title: "Bulk Listing", descriptiom: "List multiple NFTs for sale with little effort needed.", image: AssetBetaBulkListing },
    { title: "Wallet", descriptiom: "Connect your wallet and customize your profile.", image: AssetBetaWallet },
    { title: "Sweep", descriptiom: "Sweep across multiple collections with ease.", image: AssetBetaSweep },
  ];

  const Box = ({ image, title, description, imgPosition }: { image: any; title: string; description: string; imgPosition: 0 | 1 }) => (
    <div className={`flex ${imgPosition === 1 && "flex-row-reverse"} items-center px-[15px] py-[17px] gap-x-[15px] border border-gray rounded-md`}>
      <div className="w-1/4">
        <img src={image}></img>
      </div>
      <div className="flex flex-col h-fit gap-y-[5px] justify-center">
        <h6 className="text-h6 text-white font-spaceGrotesk">{title}</h6>
        <p className="text-bodyMd text-gray-light font-spaceGrotesk">{description}</p>
      </div>
    </div>
  );

  const footer = (
    <div className="flex w-full justify-center items-center p-5">
      <Button className="btn btn-secondary w-full" onClick={onClose}>
        CLOSE
      </Button>
    </div>
  );

  function renderFeatures() {
    return features.map((feature, index) => <Box key={index} imgPosition={index % 2 === 0 ? 0 : 1} image={feature.image} title={feature.title} description={feature.descriptiom} />);
  }

  function onClose() {
    setShow(false);
    setItem("firstLogin", false);
    dispatch(toggleClosedBetaModal());
    setfirstToggle(true);
  }
  React.useEffect(() => {
    if (firstToggle) {
      setfirstToggle(false);

      return;
    }
    if (!getItem("firstLogin")) {
      setShow(showClosedBetaModal);
    }
  }, [showClosedBetaModal]);

  return (
    <Modal title={"Welcome to Closed Beta!"} onClose={onClose} className="closedBeta" show={show} footer={footer}>
      <div className="flex flex-col h-full px-5 pt-[18px] pb-[15px]">
        <p className="text-bodyMd text-white font-spaceGrotesk mb-5">
          Please beware the platform is running on testnet. Smart contracts are ready but have not been connected on purpose given there will be a clean-up deployment after testnet to fix bugs and
          improve features.
        </p>
        <div className="flex flex-col gap-y-2.5 pb-[10px]">
          <h6 className="text-h6 text-white font-spaceGrotesk">Beta Features</h6>
          {renderFeatures()}
        </div>
      </div>
    </Modal>
  );
};

export default ClosedBetaModal;
