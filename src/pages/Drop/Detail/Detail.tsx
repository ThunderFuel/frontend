import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Banner from "../components/Banner";
import About from "../components/About";
import Blocks from "../components/Blocks";
import Tab from "../components/Tab/Tab";
import Team from "../components/Team";
import Roadmap from "../components/Roadmap";
import FAQ from "../components/FAQ/FAQ";
import DropDetailProvider from "./DetailContext";
import dropService from "api/drop/drop.service";
import { useParams } from "react-router-dom";

import "./Detail.css";

const Detail = () => {
  const { dropId } = useParams();

  const [dropDetail, setDropDetail] = useState<any>({
    team: [],
    roadmap: [],
  });

  useEffect(() => {
    dropService.getDropPrimary(dropId).then((responseDrop: any) => {
      setDropDetail(responseDrop);
      console.log(responseDrop);

      document.body.classList.add("drop", responseDrop.className);
    });

    return () => {
      console.log(dropDetail.className);
      document.body.removeAttribute("class");
    };
  }, [dropId]);

  useEffect(() => {
    return () => {
      document.body.removeAttribute("class");
    };
  }, []);

  return (
    <DropDetailProvider value={{ dropDetail }}>
      <div className="flex flex-col gap-5 py-5">
        <div className="px-10 flex flex-col gap-5">
          <Title />
          <Banner />
          <About />
        </div>
        <Blocks />
        <div className="mt-10 px-10">
          <Tab className="text-white">
            <Tab.Item title="Meet the Team">
              <Team />
            </Tab.Item>
            <Tab.Item title="Road Map">
              <Roadmap />
            </Tab.Item>
            <Tab.Item title="FAQ">
              <FAQ />
            </Tab.Item>
          </Tab>
        </div>
      </div>
    </DropDetailProvider>
  );
};

export default Detail;
