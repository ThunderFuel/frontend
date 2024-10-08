import React, { useEffect, useRef } from "react";
import Img from "components/Img";

import { useDropDetailContext } from "../../Detail/DetailContext";
import "./Banner.css";

const Banner = () => {
  const { dropDetail } = useDropDetailContext();
  const ref = useRef<HTMLVideoElement>(null);
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
    <div className="banner-container">
      <div className="banner-wrapper animate">
        {dropDetail.bannerVideo ? (
          <video ref={ref} className="banner-image" muted autoPlay loop poster={dropDetail.bannerImage}>
            <source src={dropDetail.bannerVideo} type="video/mp4" />
          </video>
        ) : (
          <Img className="banner-image" src={dropDetail.bannerImage} />
        )}
      </div>
    </div>
  );
};

export default Banner;
