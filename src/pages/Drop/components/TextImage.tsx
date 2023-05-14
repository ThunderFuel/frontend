import React from "react";
import Img from "components/Img";
import clsx from "clsx";

const Text = ({ title, text }: any) => {
  return (
    <div className="bg-white bg-opacity-10 p-10 flex flex-col gap-5 text-white max-w-[540px] min-w-[540px]">
      <h4 className="text-h4">{title}</h4>
      <div className="body-medium">{text}</div>
    </div>
  );
};

interface ITextImage {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
}

const TextImage = (props: ITextImage) => {
  return (
    <div className={clsx("flex gap-5", props.reverse ? "flex-row-reverse" : "")}>
      <Text title={props.title} text={props.text} />
      <div className="flex-1">
        <Img src={props.image} />
      </div>
    </div>
  );
};

export default TextImage;
