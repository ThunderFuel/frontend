import React from "react";
import { useDropDetailContext } from "../../DropContext";
import { IconCircleCheck, IconEmptyCircle } from "icons";

import "./Roadmap.css";

const Checked = ({ checked }: { checked?: boolean }) => {
  const Icon = checked ? IconCircleCheck : IconEmptyCircle;

  return <Icon className="text-white h-7 w-7" />;
};
const RoadmapItems = ({ title, text, image, checked }: any) => {
  return (
    <div className="roadmap">
      <div className="pt-5 pl-5">
        <Checked checked={checked} />
      </div>
      <div className="flex flex-1 flex-col gap-2 py-5">
        <h5 className="text-h5 text-white">{title}</h5>
        <div className="body-medium text-white text-opacity-50">{text}</div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${image})` }} />
    </div>
  );
};
const Roadmap = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="flex flex-col gap-5">
      {dropDetail.roadmap.map((item: any, k: number) => (
        <RoadmapItems {...item} key={k} />
      ))}
    </div>
  );
};

export default Roadmap;
