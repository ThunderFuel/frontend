import React from "react";

interface ISingleVideo {
  image: string;
  video: string;
  className?: string;
}

const SingleVideo = (props: ISingleVideo) => {
  return (
    <div className="flex flex-1 min-h-[430px]">
      <video className="w-full h-full" autoPlay muted loop poster={props.image}>
        <source src={props.video} type="video/mp4" />
      </video>
    </div>
  );
};

export default SingleVideo;
