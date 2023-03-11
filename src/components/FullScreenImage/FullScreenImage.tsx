import Img from "components/Img";
import Modal from "components/Modal";
import { IconExitFullscreen } from "icons";
import React from "react";

const FullScreenImage = ({ image, onClose, show }: { image: string; onClose: any; show: boolean }) => {
  return (
    <Modal onClose={onClose} show={show}>
      <div className="w-full h-full">
        <Img src={image} className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  h-full max-h-full max-w-full" />
        <div className="absolute top-7 right-7">
          <div className="border border-gray rounded-md p-2 group cursor-pointer bg-bg-light group" onClick={onClose}>
            <IconExitFullscreen className="text-gray-light group-hover:text-white" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenImage;
