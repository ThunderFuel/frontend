import React from "react";
import { useDropDetailContext } from "../../DropContext";
import AllowListPhase from "../AllowListPhase";

const About = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="flex gap-20 px-10 text-white">
      <div className="flex flex-col gap-5">
        <h3 className="text-h3">About</h3>
        <div className="body-medium">{dropDetail.about}</div>
      </div>
      <div className="w-full min-w-[520px] max-w-[520px]">
        <AllowListPhase />
      </div>
    </div>
  );
};

export default About;
