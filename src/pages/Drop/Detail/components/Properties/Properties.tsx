import React from "react";
import Tab from "../../../components/Tab/Tab";
import Team from "../../../components/Team";
import Roadmap from "../../../components/Roadmap";
import FAQ from "../../../components/FAQ/FAQ";
import { useDropDetailContext } from "../../DetailContext";

const Properties = () => {
  const { dropDetail } = useDropDetailContext();
  console.log(dropDetail);

  return (
    <div className="mt-10 px-10">
      <Tab className="text-white">
        {dropDetail.team && dropDetail.team.length ? (
          <Tab.Item title="Meet the Team">
            <Team />
          </Tab.Item>
        ) : null}
        {dropDetail.roadmap && dropDetail.roadmap.length ? (
          <Tab.Item title="Road Map">
            <Roadmap />
          </Tab.Item>
        ) : null}
        {dropDetail.faq && dropDetail.faq.length ? (
          <Tab.Item title="FAQ">
            <FAQ />
          </Tab.Item>
        ) : null}
      </Tab>
    </div>
  );
};

export default Properties;
