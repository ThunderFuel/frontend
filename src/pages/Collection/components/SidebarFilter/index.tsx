import React from "react";
import { IconChevronDoubleLeft } from "icons";
import Checkbox from "components/CheckBox";
import Collapse from "components/Collapse";
import clsx from "clsx";
import { DisplayType, useCollectionContext } from "../../CollectionContext";

const Index = () => {
  const { displayType, setDisplayType } = useCollectionContext();
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray overflow-hidden transition-all", show ? "w-1" : "w-72")}>
        <div className="w-72 pr-5 py-5">
          <div className="flex items-center justify-between border-b border-b-gray pb-5">
            <h5 className="text-h5 text-white">Filters</h5>
            <div
              className="icon-btn cursor-pointer"
              onClick={() => {
                if (displayType !== DisplayType.LIST) {
                  setDisplayType(DisplayType.GRID5);
                }
                setShow(!show);
              }}
            >
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
    </div>
  );
};

export default Index;
