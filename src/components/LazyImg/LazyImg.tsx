import React, { useEffect, useRef } from "react";
import Img from "../Img";
import { AssetDefaultImageBg } from "assets";

const LazyImg = ({ src, ...etc }: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          ref.current.src = src;
          obs.disconnect();
        }
      }
    }, {});
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <Img {...etc} src={AssetDefaultImageBg} ref={ref} />;
};

export default LazyImg;
