import React from "react";

const PageTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-h3">{title}</h3>
      <div className="body-medium text-gray-light">{description}</div>
    </div>
  );
};

export default PageTitle;
