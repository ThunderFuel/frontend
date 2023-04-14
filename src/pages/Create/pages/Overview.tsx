import React from "react";
import { AssetCreateImage1, AssetMockNFT1 } from "assets";
import Button from "components/Button";
import { IconArrowRight, IconToken } from "icons";
import EthereumPrice from "components/EthereumPrice";
import CollectionItem from "components/CollectionList/components/List/CollectionItem";
import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";

const Overview = () => {
  const navigate = UseNavigate();

  const InfoBox = () => {
    return (
      <div className="flex border-y border-l border-gray rounded-md">
        <div className="flex flex-col pl-4 py-[14px] border-r border-gray w-full gap-2 ">
          <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">NFTS CREATED</div>
          <h4 className="text-head4 font-spaceGrotesk ">123</h4>
        </div>
        <div className="flex flex-col pl-4 py-[14px] border-r border-gray w-full gap-2 ">
          <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">TOTAL EARNINGS</div>
          <EthereumPrice price={0.423} priceClassName="text-head4" />
        </div>
        <div className="flex flex-col pl-4 py-[14px] border-r border-gray w-full gap-2 ">
          <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">POTENTIAL EARNINGS</div>
          <EthereumPrice price={1.2} priceClassName="text-head4" />
        </div>
        <div className="flex flex-col pl-4 py-[14px] border-r border-gray w-full gap-2 ">
          <div className="text-headlineSm font-bigShoulderDisplay text-gray-light">COLLECTORS</div>
          <h4 className="text-head4 font-spaceGrotesk ">12</h4>
        </div>
      </div>
    );
  };

  const mockCollection = {
    name: "HE SOLD???",
    image: AssetMockNFT1,
    price: 0.24,

    id: 0,
    tokenOrder: 1,
    isSelected: false,
    tokenAttributes: [],
    collectionId: 2,
    rarity: 5,
    salable: true,
  };

  return (
    <div className="flex flex-col gap-5">
      <InfoBox />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h4 className="text-head4 font-spaceGrotesk">Recently Created</h4>
          <div className="flex gap-2.5">
            <Button className="btn-secondary btn-sm" onClick={() => navigate(PATHS.PROFILE, {})}>
              SEE ALL <IconArrowRight />
            </Button>
            <Button className="btn-sm" onClick={() => navigate(PATHS.UPLOAD_ARTWORK, {})}>
              MINT AN NFT
              <IconToken />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-3">
        <CollectionItem selectionDisabled={true} collection={mockCollection}></CollectionItem>
        <CollectionItem selectionDisabled={true} collection={mockCollection}></CollectionItem>
        <CollectionItem selectionDisabled={true} collection={mockCollection}></CollectionItem>
        <CollectionItem selectionDisabled={true} collection={mockCollection}></CollectionItem>
      </div>

      <div className="flex justify-between bg-gray rounded-lg p-5">
        <div className="flex flex-col justify-between ">
          <div className="flex flex-col gap-2">
            <div className="text-head5 font-spaceGrotesk text-white">It looks like you didn’t mint an NFT yet.</div>
            <div className="text-bodyMd font-spaceGrotesk text-gray-light">Mint your first NFT today and start selling your with Thunder!</div>
          </div>
          <Button className="w-fit">
            MINT AN NFT <IconToken />
          </Button>
        </div>
        <img src={AssetCreateImage1} />
      </div>
    </div>
  );
};

export default Overview;
