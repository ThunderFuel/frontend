import React, { useState } from "react";

const ReadMore = ({ text, characterLimit }: { text: string; characterLimit: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex mt-2.5 w-11/12 items-end body-medium text-white">
      <p className="inline w-full">
        {expanded ? text + " " : text?.slice(0, characterLimit) + "... "}
        <span onClick={() => setExpanded(!expanded)} className="cursor-pointer h-fit whitespace-nowrap underline">
          {!expanded ? "Read More" : "Read Less"}
        </span>
      </p>
    </div>
  );
};

export default ReadMore;
