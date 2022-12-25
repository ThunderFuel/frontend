import React from "react";
import { IconChevronDoubleLeft } from "icons";
import Checkbox from "components/CheckBox";
import Collapse from "components/Collapse";

const Index = () => {
  return (
    <div className="flex justify-end">
      <div className="w-72 pr-5 py-5 border-r border-r-gray">
        <div className="flex items-center justify-between border-b border-b-gray pb-5">
          <h5 className="text-h5 text-white">Filters</h5>
          <div className="icon-btn">
            <IconChevronDoubleLeft className="text-gray-light" />
          </div>
        </div>
        <div className="py-5">
          <Collapse>
            <Collapse.Header>112233</Collapse.Header>
            <Collapse.Body>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="hover:bg-gray border border-gray rounded-md p-2.5 text-white">
                  <Checkbox>
                    <span className="body-medium">Sky{i}</span>
                  </Checkbox>
                </div>
              ))}
            </Collapse.Body>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Index;
