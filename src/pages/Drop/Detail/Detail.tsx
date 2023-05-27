import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Banner from "../components/Banner";
import About from "../components/About";
import Blocks from "../components/Blocks";
import DropDetailProvider from "./DetailContext";
import dropService from "api/drop/drop.service";
import { useParams } from "react-router-dom";

import "./Detail.css";
import Properties from "./components/Properties";

const Detail = () => {
  const { dropId } = useParams();

  const [dropDetail, setDropDetail] = useState<any>({
    team: [],
    roadMap: [],
    faq: [],
    allowListPhase: [],
  });

  useEffect(() => {
    dropService.getDropDetail(dropId).then((response: any) => {
      const dropDetail = response.data;
      setDropDetail(dropDetail);

      document.body.classList.add("drop", dropDetail.className);
    });

    return () => {
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
        <Properties />
      </div>
    </DropDetailProvider>
  );
};

export default Detail;
