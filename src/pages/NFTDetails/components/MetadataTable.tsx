import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconListed } from "icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { RightMenuType, setPresetPrice, setRightMenu } from "store/NFTDetailsSlice";
import "./MetadataTable.css";

const MetadataTable = ({ metadata, traitfloors }: { metadata: any; traitfloors: any }) => {
  const dispatch = useDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);

  const isOwner = () => {
    return isConnected ? user?.id === selectedNFT?.user?.id : false;
  };

  const getTraitFloor = (item: any) => traitfloors.find((trait: any) => trait.traitType === item.traitType)?.price ?? "-";

  return (
    <div className="flex flex-col border border-gray rounded-[5px]">
      <h6 className="pl-5 py-4 border-b border-gray">Metadata</h6>
      <div className="table-head grid-cols-3">
        <div className="text-headline-01">TRAIT</div>
        <div className="text-headline-01">NAME</div>
        <div className="text-headline-01">TRAIT FLOOR</div>
      </div>

      {metadata.map((item: any, i: number) => {
        return (
          <div className="group" key={i}>
            <div className="table-body grid-cols-3 cursor-pointer">
              <div>{item.traitType} </div>
              <div className="text-white">{item.value}</div>
              <div>
                <div className="flex-center">
                  <EthereumPrice priceClassName="text-head6 text-white" price={getTraitFloor(item)} />
                </div>
              </div>
            </div>
            {isOwner() ? (
              <div
                className={`overflow-hidden ${
                  i === metadata.length - 1 ? "rounded-b-[4px]" : ""
                } border-t border-gray flex justify-center transition-all duration-300 ease-in-out opacity-0 h-0 group-hover:opacity-100 group-hover:h-10 group-hover:bg-bg-light`}
              >
                <Button
                  className="btn-secondary no-bg text-headline-02 border-none rounded-none py-3"
                  onClick={() => {
                    dispatch(setPresetPrice(getTraitFloor(item) === "-" ? "" : getTraitFloor(item)));
                    dispatch(setRightMenu(RightMenuType.ListNFT));
                  }}
                >
                  LIST AT TRAIT FLOOR <IconListed className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MetadataTable;
