import React, { useEffect, useRef, useState } from "react";
import { AssetDefaultImageBg } from "assets";
import Img from "../Img";

const LazyImg = (props: any) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef<any>();
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, {});
    observer.observe(placeholderRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? <Img {...props} alt={props.alt || ""} /> : <img {...props} ref={placeholderRef} src={AssetDefaultImageBg} />;
};

export default LazyImg;
