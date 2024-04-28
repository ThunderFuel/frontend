import React from "react";

const CoverImage = ({ src }: any) => {
  return <div className="profile-cover-image lg:border-r lg:border-r-gray" style={{ backgroundImage: `url(${src})` }}></div>;
};

export default CoverImage;
