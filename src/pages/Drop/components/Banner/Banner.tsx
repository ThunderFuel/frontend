import React, { useEffect } from "react";

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
      <video className="banner-image" autoPlay loop>
        <source src={dropDetail.banner} type="video/mp4" />
      </video>
    </div>
  );
};

export default Banner;
