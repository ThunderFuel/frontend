import React from "react";
import { IconArrowDown } from "icons";
import clsx from "clsx";

export interface ISelectOption {
  value: any;
  text: any;
}
const Select = ({ options = [1, 2, 3, 4, 5] }: any) => {
  const [show, setShow] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);

  const onToggle = () => {
    setShow(!show);
  };

  return (
    <div className="relative">
      <div className="flex-center p-3 gap-3 border border-gray bg-bg rounded-md cursor-pointer" onClick={onToggle}>
        <span className="body-medium text-white">Price Low to High</span>
        <IconArrowDown className={clsx("transition-all duration-300", show && "rotate-180")} />
      </div>
      <div
        className={clsx("absolute transition-all duration-300 translate-y-full text-white min-w-full overflow-hidden", show ? "-bottom-2" : "bottom-0")}
        style={{ height: show ? `${listRef.current?.scrollHeight}px` : 0 }}
      >
        <ul className="border border-gray bg-bg rounded-md divide-y divide-gray" ref={listRef}>
          {options.map((option: any) => {
            return (
              <li key={option} className="body-medium p-3 hover:bg-bg-light cursor-pointer">
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
