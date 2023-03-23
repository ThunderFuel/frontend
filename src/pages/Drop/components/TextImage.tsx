import React from "react";
import Img from "../../../components/Img";
import { AssetDropImage } from "../../../assets";
import clsx from "clsx";

const Text = () => {
  return (
    <div className="bg-white bg-opacity-10 p-10 flex flex-col gap-5 text-white max-w-[540px]">
      <h4 className="text-h4">Story</h4>
      <p>
        The planet melted. Society collapsed. Cities cracked in half. People turned into collapsed guts. Animal and marine life cooked in place. Icons of earth turned into blistered shadows. But one
        animal was more prepared for the cosmic cook than the rest.
      </p>
      <p>Turtles.</p>
      <p>
        With the asteroid came a nuclear blast clumped with a radiation burst that splattered out over earth like a toxic event. What we didn’t know then but will learn now is that the asteroid was
        made with something cosmically special and would change life on earth forever.
      </p>
      <p>
        And with that – a soul unlocked that had always been deep inside its animal form. So, while the last few humans scurried deep into the air pockets of the earth below, desperate to maintain
        their race, the turtles thrived as they evolved above. The world -- in its ruin-- had a new lead species rise from it like a reptilian phoenix.
      </p>
      <p>Shellz Orb.</p>
    </div>
  );
};

export enum TextImageAlign {
  Left = "left",
  Right = "Right",
}

interface ITextImage {
  align?: TextImageAlign;
}

const TextImage = (props: ITextImage) => {
  return (
    <div className={clsx("flex gap-5", props.align === TextImageAlign.Right ? "flex-row-reverse" : "")}>
      <Text />
      <div>
        <Img src={AssetDropImage} />
      </div>
    </div>
  );
};

export default TextImage;
