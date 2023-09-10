import React from "react";

const Text = ({ title, text, width = 540 }: any) => {
  return (
    <div className="bg-white bg-opacity-10 p-10 flex flex-col gap-5 text-white" style={{ maxWidth: `${width}px`, minWidth: `${width}px` }}>
      <h4 className="text-h4">{title}</h4>
      <div className="body-medium" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default Text;
