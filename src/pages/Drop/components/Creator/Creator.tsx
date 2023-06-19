import React from "react";
import Img from "components/Img/Img";
import Badge from "../Badge";

const Creator = ({ creator }: any) => {
  return (
    <Badge className="flex gap-2.5 items-center">
      <Img className="w-8 h-8 overflow-hidden rounded-full" src={creator?.image} />
      <div className="text-white">
        <span className="text-white text-opacity-50">Created by </span>
        {creator?.name ?? "-"}
      </div>
    </Badge>
  );
};

export default Creator;
