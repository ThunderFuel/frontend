import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Banner from "../components/Banner";
import About from "../components/About";
import Blocks from "../components/Blocks";
import DropDetailProvider from "./DetailContext";
import dropService from "api/drop/drop.service";
import { useParams } from "react-router-dom";

import "./Detail.css";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { useSelector } from "react-redux";
import { getSerializeAddress } from "store/walletSlice";

const Detail = () => {
  const { dropId } = useParams();
  const navigate = useNavigate();
  const walletAddress = useSelector(getSerializeAddress);

  const [dropDetail, setDropDetail] = useState<any>({
    team: [],
    roadMap: [],
    faq: [],
    allowListPhase: [],
  });

  useEffect(() => {
    dropService
      .getDropDetail(dropId, walletAddress)
      .then((response: any) => {
        const dropDetail = response.data;
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
      <div className="flex flex-col gap-24 py-5">
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
