import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Banner from "../components/Banner";
import About from "../components/About";
import Blocks from "../components/Blocks";
import DropDetailProvider from "./DetailContext";
import dropService, { FLUID_DROP_IDS } from "api/drop/drop.service";
import { useParams } from "react-router-dom";

import "./Detail.css";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const Detail = () => {
  const { dropId } = useParams();
  const navigate = useNavigate();

  const [dropDetail, setDropDetail] = useState<any>({
    team: [],
    roadMap: [],
    faq: [],
    allowListPhase: [],
  });

  useEffect(() => {
    dropService
      .getDropDetail(dropId)
      .then((response: any) => {
        const dropDetail = response.data;
        if (dropId && FLUID_DROP_IDS.includes(Number(dropId))) {
          dropDetail.creator = {
            name: "Fluid",
            image: "https://thassetstorage.blob.core.windows.net/assets/drop/f330f6a4-37a8-4d28-9af2-5953fffasd334.png",
          };
        }
        setDropDetail(dropDetail);

        document.body.classList.add("drop", dropDetail.className);
      })
      .catch(() => {
        navigate(PATHS.DROPS);
      });

    return () => {
      document.body.removeAttribute("class");
    };
  }, [dropId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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
      </div>
    </DropDetailProvider>
  );
};

export default Detail;
