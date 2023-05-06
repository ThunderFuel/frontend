import React from "react";
import ModalBase from "./ModalBase";
import Alert from "../components/Alert";
import Img from "components/Img";
import { AssetDropEditClipImageText, AssetDropEditClipInfinityScroll, AssetDropEditClipSingleImage, AssetDropEditClipSingleVideo, AssetDropEditClipVideoText } from "assets";

const options = [
  [AssetDropEditClipInfinityScroll, AssetDropEditClipImageText, AssetDropEditClipVideoText],
  [AssetDropEditClipSingleImage, AssetDropEditClipSingleVideo],
];

const ModalAddNewBlock = (props: any) => {
  return (
    <ModalBase {...props} title="Add New Block">
      <div className="flex flex-col gap-6 text-white">
        <Alert>Choose the block format you would like to add.</Alert>
        <div className="p-5 flex flex-col gap-5">
          {options.map((optionItems, index) => {
            return (
              <ul key={index} className="flex-center gap-5">
                {optionItems.map((item) => {
                  return (
                    <li key={item} className="cursor-pointer transition-opacity opacity-50 hover:opacity-100">
                      <Img src={item} />
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalAddNewBlock;
