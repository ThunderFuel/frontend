import React from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";
import AllowListPhase from "../AllowListPhase";
import Tab from "../Tab";
import Team from "../Team";
import Roadmap from "../Roadmap";
import FAQ from "../FAQ";

const About = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="flex gap-20 px-10 text-white">
      <Tab className="text-white flex-1" headerClassName="-mx-5 p-5 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-md">
        <Tab.Item title="About">
          <div className="body-medium" dangerouslySetInnerHTML={{ __html: dropDetail.about }}></div>
        </Tab.Item>
        {dropDetail.team && dropDetail.team.length ? (
          <Tab.Item title="Meet the Team">
            <Team />
          </Tab.Item>
        ) : null}
        {dropDetail.roadMap && dropDetail.roadMap.length ? (
          <Tab.Item title="Road Map">
            <Roadmap />
          </Tab.Item>
        ) : null}
        {dropDetail.faq && dropDetail.faq.length ? (
          <Tab.Item title="FAQ">
            <FAQ faq={dropDetail.faq} />
          </Tab.Item>
        ) : null}
      </Tab>

      <div className="w-full min-w-[520px] max-w-[520px]">
        <AllowListPhase />
      </div>
    </div>
  );
};

export default About;
