import React from "react";

const CoverImage = ({ src }: any) => {
  return <div className="profile-cover-image border-r" style={{ backgroundImage: `url(${src})` }}></div>;
};

export default CoverImage;
