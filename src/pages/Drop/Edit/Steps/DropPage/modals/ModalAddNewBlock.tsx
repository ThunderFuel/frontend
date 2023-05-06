import React from "react";
import Modal from "./Modal";
import Alert from "../components/Alert";
import Img from "components/Img";
import { AssetDropEditClipImageText, AssetDropEditClipInfinityScroll, AssetDropEditClipSingleImage, AssetDropEditClipSingleVideo, AssetDropEditClipVideoText } from "assets";

const options = [
  [
    {
      type: "InfinityScroll",
      image: AssetDropEditClipInfinityScroll,
      name: "Infinite Scroll Gallery",
    },
    {
      type: "ImageText",
      image: AssetDropEditClipImageText,
      name: "Image & Text",
    },
    {
      type: "VideoText",
      image: AssetDropEditClipVideoText,
      name: "Video & Text",
    },
  ],
  [
    {
      type: "SingleImage",
      image: AssetDropEditClipSingleImage,
      name: "Single Image",
    },
    {
      type: "SingleVideo",
      image: AssetDropEditClipSingleVideo,
      name: "Single Video",
    },
  ],
];

const ModalAddNewBlock = (props: any) => {
  const onClick = (item: any) => {
    console.log(item);
  };

  return (
    <Modal {...props} title="Add New Block">
      <div className="flex flex-col gap-6 text-white">
        <Alert>Choose the block format you would like to add.</Alert>
        <div className="p-5 flex flex-col gap-5">
          {options.map((optionItems, index) => {
            return (
              <ul key={index} className="flex-center gap-5">
                {optionItems.map((item) => {
                  return (
                    <li key={item.type} className="flex flex-col gap-4 cursor-pointer transition-opacity opacity-50 hover:opacity-100" onClick={() => onClick(item)}>
                      <Img src={item.image} />
                      <h6 className="text-h6">{item.name}</h6>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddNewBlock;
