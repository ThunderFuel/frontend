import React from "react";
import TabDisplayType from "./TabDisplayType";

const Index = () => {
  return (
    <div className="border-t border-gray">
      <div className="container">
        <div className="p-2.5 flex items-center justify-between text-white">
          <div>1</div>
          <div>
            <TabDisplayType />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
