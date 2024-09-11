import React, { useEffect, useRef } from "react";
import "./Tooltip.css";
import clsx from "clsx";
import ReactDOM from "react-dom";

interface ITooltip {
  children: React.ReactNode;
  position?: string;
  content?: any;
  hiddenArrow?: any;
  contentClass?: any;
  appendToBody?: any;
}

const Tooltip = ({ children, position = "bottom", content, contentClass, hiddenArrow = false, appendToBody = false }: ITooltip) => {
  const ref = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  let refContentTimeout: any;
  let refContentOpacityTimeout: any;

  const currentPosition = () => {
    if (ref.current && refContent.current) {
      const x = ref.current?.getBoundingClientRect().x + ref.current.offsetWidth / 2;
      const y = ref.current?.getBoundingClientRect().y + ref.current?.getBoundingClientRect().height / 2 - 10;

      const windowWidth = window.innerWidth;
      const contentwidth = refContent.current?.clientWidth;
      const isOffScreen = Math.floor(x) + contentwidth / 2 >= windowWidth;
      const offScreenWidth = contentwidth / 2 - (windowWidth - Math.floor(x)); //Ekranin disinda kalan alan

      refContent.current.style.left = `${x + (isOffScreen ? -(offScreenWidth + 10) : 0)}px`; // +10 content ile ekran kenari arasina bosluk eklemek icin
      refContent.current.style.top = `${y}px`;
    }
  };
  const onMouseEnter = () => {
    if (ref.current && refContent.current) {
      refContentTimeout = setTimeout(() => {
        currentPosition();
        refContentOpacityTimeout = setTimeout(() => {
          if (refContent?.current) {
            refContent.current.style.visibility = "visible";
            refContent.current.style.opacity = "1";
          }
        }, 100);
      }, 100);
    }
  };
  const onMouseLeave = () => {
    if (refContent.current) {
      clearTimeout(refContentTimeout);
      clearTimeout(refContentOpacityTimeout);
      refContent.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    currentPosition();
  }, []);

  let container: any = (
    <div ref={refContent} className={clsx("content", contentClass)}>
      {content} {!hiddenArrow && <span className="arrow" />}
    </div>
  );
  if (appendToBody) {
    container = ReactDOM.createPortal(
      <div ref={refContent} className={clsx("tooltip-content", contentClass)}>
        {content} {!hiddenArrow && <span className="arrow" />}
      </div>,
      document.body
    );
  }

  return (
    <div className={clsx("tooltip", position)} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      {container}
    </div>
  );
};

export default Tooltip;
