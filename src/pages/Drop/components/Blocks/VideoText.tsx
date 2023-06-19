import React from "react";
import clsx from "clsx";
import Text from "./Text";
import SingleVideo from "./SingleVideo";

interface IVideoText {
  image: string;
  video: string;
  title: string;
  text: string;
  reverse?: boolean;
}

const VideoText = (props: IVideoText) => {
  return (
    <div className={clsx("flex gap-5", props.reverse ? "flex-row-reverse" : "")}>
      <Text title={props.title} text={props.text} width={460} />
      <SingleVideo video={props.video} image={props.image} />
    </div>
  );
};

export default VideoText;
