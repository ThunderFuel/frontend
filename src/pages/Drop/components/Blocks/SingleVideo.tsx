import React, { useEffect, useRef, useState } from "react";
import { IconVideo } from "icons";

interface ISingleVideo {
  image: string;
  video: string;
}

const SingleVideo = (props: ISingleVideo) => {
  const [playVideo, setPlayVideo] = useState(false);
  const ref = useRef<any>();

  const onClick = () => {
    setPlayVideo(true);
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onClick();
          obs.disconnect();
        }
      }
    }, {});
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-1 min-h-[430px]" ref={ref}>
      {!playVideo ? (
        <div className="flex-1 w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${props.image})` }}>
          <div className="flex w-full h-full flex-center bg-gray bg-opacity-50">
            <IconVideo className="text-white w-16 h-16 cursor-pointer" onClick={onClick} />
          </div>
        </div>
      ) : (
        <video className="w-full h-full" autoPlay loop>
          <source src={props.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default SingleVideo;
