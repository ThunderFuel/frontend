import React from "react";
import { useClickOutside } from "hooks/useClickOutside";
import "./Dropdown.css";
import clsx from "clsx";
const Dropdown = ({ children, options, isToggle, renderItem, ...etc }: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setShow(false);
  });
  const onClick = (value: any) => {
    if (!isToggle) {
      setShow(false);
      etc.onClick(value);
    }
  };

  return (
    <div className="fuel-dropdown" ref={containerRef}>
      <span className={show ? "active" : ""} onClick={() => setShow(!show)}>
        {children}
      </span>
      {show ? (
        <ul className={clsx("absolute right-0 top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] overflow-hidden z-10", etc.className, !etc.hideBorder ? "divide-y divide-gray" : "")}>
          {options.map((item: any, k: any) => {
            return renderItem ? (
              renderItem(item)
            ) : (
              <li key={k} onClick={() => onClick(item.value)} className="flex items-center justify-between cursor-pointer px-4 py-3 text-white hover:bg-bg-light">
                <div className="flex w-full body-medium whitespace-nowrap">{item.text}</div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
