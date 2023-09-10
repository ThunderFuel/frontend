import React from "react";
import clsx from "clsx";
import Text from "./Text";

interface IImageText {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
}

const ImageText = (props: IImageText) => {
  return (
    <div className={clsx("flex gap-5", props.reverse ? "flex-row-reverse" : "")}>
      <Text title={props.title} text={props.text} />
      <div className="flex-1 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${props.image})` }} />
    </div>
  );
};

export default ImageText;
