import React, { useEffect } from "react";

import "./Banner.css";

const Banner = () => {
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
        <source src="https://thassetstorage.blob.core.windows.net/assets/thunder-banner-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Banner;
