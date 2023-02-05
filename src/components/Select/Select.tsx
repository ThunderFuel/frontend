import React from "react";
import { IconArrowDown } from "icons";
import clsx from "clsx";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface ISelectOption {
  value: any;
  text: any;
}

interface ISelect {
  options: ISelectOption[];
  value: ISelectOption;
  onChange: (value: ISelectOption) => void;
}

const Select = ({ options, value, onChange }: ISelect) => {
  const [show, setShow] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onToggle = () => {
    setShow(!show);
  };
  const onSelect = (option: ISelectOption) => {
    onChange(option);
    onToggle();
  };
  useClickOutside(containerRef, () => {
    setShow(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex-center p-3 gap-3 border border-gray bg-bg-light rounded-md cursor-pointer" onClick={onToggle}>
        <span className="body-medium text-white text-overflow">{value?.text}</span>
        <IconArrowDown className={clsx("transition-all duration-300", show && "rotate-180")} />
      </div>
      <div
        className={clsx("absolute transition-all duration-300 translate-y-full text-white min-w-full overflow-hidden", show ? "-bottom-2" : "bottom-0")}
        style={{ height: show ? `${listRef.current?.scrollHeight}px` : 0 }}
      >
        <ul className="border border-gray bg-bg rounded-md divide-y divide-gray" ref={listRef}>
          {options.map((option, index) => {
            return (
              <li key={index} className="body-medium p-3 hover:bg-bg-light cursor-pointer" onClick={() => onSelect(option)}>
                {option.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
