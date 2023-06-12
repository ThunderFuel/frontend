import React, { useEffect } from "react";
import Img from "components/Img";

import { useDropDetailContext } from "../../Detail/DetailContext";
import "./Banner.css";

const Banner = () => {
  const { dropDetail } = useDropDetailContext();

  const setScrollPosition = () => {
    const offset = window.scrollY;
    const offsetHeight = document.body.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollValue = String(offset / (offsetHeight - innerHeight));

    document.body.style.setProperty("--scroll", scrollValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", setScrollPosition, false);

    return () => {
      window.removeEventListener("scroll", setScrollPosition, false);
    };
  });

  return (
    <div className="banner-container animate">
      <Img className="banner-image" src={dropDetail.banner} />
    </div>
  );
};

export default Banner;
