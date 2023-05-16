import React, { useState } from "react";
import clsx from "clsx";
import Text from "./Text";
import { IconVideo } from "../../../../icons";

interface IVideoText {
  image: string;
  video: string;
  title: string;
  text: string;
  reverse?: boolean;
}

const VideoText = (props: IVideoText) => {
  const [playVideo, setPlayVideo] = useState(false);
  const onClick = () => {
    setPlayVideo(true);
  };

  return (
    <div className={clsx("flex gap-5", props.reverse ? "flex-row-reverse" : "")}>
      <Text title={props.title} text={props.text} width={460} />
      <div className="flex-1" style={{ background: `url(${props.image})` }}>
        {!playVideo ? (
          <div className="w-full h-full flex-center bg-gray bg-opacity-50">
            <IconVideo className="text-white w-16 h-16 cursor-pointer" onClick={onClick} />
          </div>
        ) : (
          <video className="w-full h-full" controls autoPlay>
            <source src={props.video} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoText;
