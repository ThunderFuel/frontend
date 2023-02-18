import React from "react";
import InputSearch from "../InputSearch";
import clsx from "clsx";

const Group = ({ children, title }: { title: any; children: React.ReactNode }) => {
  return (
    <>
      <div className="border-b border-gray ">
        <span className="flex text-headline-01 uppercase text-gray-light pl-2 py-2">{title}</span>
      </div>
      <div className="flex gap-2 flex-col p-4">{children}</div>
    </>
  );
};

const Item = ({ item, className, ...etc }: { className?: string; item: any; [key: string]: any }) => {
  const { id, image, name } = item;

  return (
    <div
      className={clsx("cursor-pointer", "flex gap-2.5 items-center text-h6 text-white", "tracking-normal text-left border border-gray rounded-md p-3", "hover:bg-gray", className)}
      key={id}
      onClick={() => etc?.onClick(item)}
    >
      {image && <img className="rounded-full h-8 w-8" src={image} alt={name} />}
      <span>{name}</span>
    </div>
  );
};

const AutoCompleteRoot = (props: any, ref: any) => {
  const { children, className, show, ...etc } = props;

  return (
    <div ref={ref} className={className}>
      <InputSearch {...etc} className={props.inputClassName} />
      {show && (
        <div className="relative">
          <div className={clsx("absolute overflow-hidden z-10", "lg:no-scrollbar lg:overflow-y-auto lg:w-full lg:max-h-[430px] bg-bg-light lg:border border-gray lg:rounded-md lg:mt-2")}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Object.assign(React.forwardRef(AutoCompleteRoot), { Group, Item });
