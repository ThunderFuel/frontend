import React from "react";
import clsx from "clsx";
import Collapse from "components/Collapse";
import Radio from "components/Radio";

const SidebarFilter = ({ filterItems, onChange, value }: any) => {
  return (
    <div className="p-5 border-r border-gray">
      <div className="w-60">
        <Collapse isOpen={true}>
          <Collapse.Header>Offer Type</Collapse.Header>
          <Collapse.Body>
            {filterItems.map((item: any, k: any) => {
              const isChecked = item.value === value;

              return (
                <div key={k} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", isChecked ? "bg-gray" : "")}>
                  <Radio defaultChecked={isChecked} onClick={() => onChange(item.value)} name="offer-type">
                    <span className="body-medium">
                      {item.text} {item.count > 0 ? `(${item.count})` : null}
                    </span>
                  </Radio>
                </div>
              );
            })}
          </Collapse.Body>
        </Collapse>
      </div>
    </div>
  );
};

export default SidebarFilter;
