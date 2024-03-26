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
  direction?: string;
  className?: string;
}

const Select = ({ options, value, onChange, direction = "bottom", className }: ISelect) => {
  const [show, setShow] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDirectionTop = direction === "top";

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
    <div className={clsx("relative", className)} ref={containerRef}>
      <div className="flex-center p-3 gap-3 border border-gray bg-bg-light rounded-md cursor-pointer text-white " onClick={onToggle}>
        <span className="body-medium text-overflow">{value?.text}</span>
        <IconArrowDown className={clsx("transition-all duration-300", show && "rotate-180")} />
      </div>
      <div
        className={clsx(
          "absolute z-10 transition-all duration-300 text-white min-w-full overflow-hidden",
          isDirectionTop ? "-translate-y-full" : "translate-y-full",
          show ? (isDirectionTop ? "-top-2" : "-bottom-2") : isDirectionTop ? "top-0" : "bottom-0"
        )}
        style={{ height: show ? `${(listRef.current?.scrollHeight as number) + 2}px` : 0 }}
      >
        <ul className="border border-gray bg-bg rounded-md divide-y divide-gray" ref={listRef}>
          {options.map((option, index) => {
            return (
              <li key={index} className="body-medium p-3 hover:bg-bg-light cursor-pointer last:border-b last:border-b-gray" onClick={() => onSelect(option)}>
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
