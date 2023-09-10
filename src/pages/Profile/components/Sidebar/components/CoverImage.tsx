import React from "react";

const CoverImage = ({ src }: any) => {
  return <div className="profile-cover-image border-r border-r-gray" style={{ backgroundImage: `url(${src})` }}></div>;
};

export default CoverImage;
