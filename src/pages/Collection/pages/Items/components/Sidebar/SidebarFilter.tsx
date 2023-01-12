import React, { useEffect } from "react";
import { IconChevronDoubleLeft, IconFilter } from "icons";
import Checkbox from "components/CheckBox";
import Collapse from "components/Collapse";
import clsx from "clsx";
import { DisplayType, useItemContext } from "../../ItemContext";

const SidebarFilter = () => {
  const { displayType, setDisplayType, fetchFilters } = useItemContext();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    fetchFilters();
  }, []);

  const onToggle = () => {
    const tmpShow = !show;
    if (displayType !== DisplayType.LIST) {
      if (tmpShow) {
        setDisplayType((prevState: string) => String(parseInt(prevState) + 1));
      } else {
        setDisplayType((prevState: string) => String(parseInt(prevState) - 1));
      }
    }
    setShow(tmpShow);
  };

  return (
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", show ? "w-16" : "w-72")}>
        <div className="sticky top-[178px] overflow-hidden">
          <div className="flex w-72 pr-5 py-5 relative">
            <div className={clsx("absolute transition-all duration-300", show ? "left-0" : "-left-12")} onClick={onToggle}>
              <div className="icon-btn bg-white fill-gray">
                <IconFilter />
              </div>
            </div>
            <div className={clsx("flex-1 transition-all duration-300", show && "pl-16")}>
              <div className="flex items-center justify-between border-b border-b-gray pb-5">
                <h5 className="text-h5 text-white">Filters</h5>
                <div className="icon-btn cursor-pointer" onClick={onToggle}>
                  <IconChevronDoubleLeft className="text-gray-light" />
                </div>
              </div>
              <div className="py-5">
                <Collapse>
                  <Collapse.Header>112233</Collapse.Header>
                  <Collapse.Body>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", false && "bg-gray")}>
                        <Checkbox checked={true}>
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
      </div>
    </div>
  );
};

export default SidebarFilter;
