import React from "react";
import { useClickOutside } from "hooks/useClickOutside";

const Dropdown = ({ children, options, ...etc }: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setShow(false);
  });
  const onClick = (value: any) => {
    setShow(false);
    etc.onClick(value);
  };

  return (
    <div className="relative" ref={containerRef}>
      <span className={show ? "active" : ""} onClick={() => setShow(!show)}>
        {children}
      </span>
      {show ? (
        <ul className="absolute right-0 top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] divide-y divide-gray overflow-hidden z-10">
          {options.map((item: any, k: any) => {
            return (
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
