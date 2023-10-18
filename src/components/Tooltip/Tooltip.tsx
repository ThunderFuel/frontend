import React, { useRef, useState } from "react";
import "./Tooltip.css";
import clsx from "clsx";

interface ITooltip {
  children: React.ReactNode;
  position?: string;
  content?: any;
  hiddenArrow?: any;
  contentClass?: any;
}

const Tooltip = ({ children, position = "bottom", content, contentClass, hiddenArrow = false }: ITooltip) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elPosition, setElPosition] = useState<any>({});
  const onMouseEnter = () => {
    if (ref.current) {
      const x = ref.current?.offsetLeft + ref.current.offsetWidth / 2;
      const y = ref.current?.offsetTop;
      setElPosition({
        x,
        y,
      });
    }
  };

  return (
    <div className={clsx("tooltip", position)} ref={ref} onMouseEnter={onMouseEnter}>
      {children}
      <div className={clsx("content", contentClass)} style={{ left: elPosition.x, top: elPosition.y }}>
        {content} {!hiddenArrow && <span className="arrow" />}
      </div>
    </div>
  );
};

export default Tooltip;
