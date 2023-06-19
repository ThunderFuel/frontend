import React from "react";

import Slider from "./Slider/Slider";
import Container from "./Container/Container";
import Header from "./Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
import { PATHS } from "router/config/paths";

const Landing = () => {
  // let amount = 0;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const el = document.getElementById("translateElement");
  //     amount = amount === 0 ? -33 : 0;
  //     if (el) el.style.transform = `translateY(${amount}px)`;
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <div className="py-2.5 h-[33px] w-full text-headline-01 uppercase bg-gray text-center text-white overflow-hidden">
        <div className="flex flex-col flex-grow ease-in-out transform duration-[350ms]">
          <div className="h-[33px]">
            Open beta is live now -{" "}
            <span
              className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:border-b after:border after:w-full"
              onClick={() => navigate(PATHS.MARKETPLACE)}
            >
              Go to marketplace
            </span>
          </div>
          <div className="h-[33px]">Marketplace Coming Soon</div>
        </div>
      </div>
      <Header />
      <div className="pt-16">
        <div className="flex flex-col w-full gap-16">
          <Slider />
          <Container />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Landing;
