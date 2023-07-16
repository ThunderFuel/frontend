import React, { useState } from "react";
import Collapse from "components/Collapse/Collapse";
import clsx from "clsx";

const FaqItem = ({ item }: any) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onOpenCallBack = (value: boolean) => {
    setIsActive(value);
  };

  return (
    <Collapse className={clsx("border-white border-opacity-10 transition-all", isActive && "bg-white bg-opacity-10")} showIcon={!!item.text} onOpenCallBack={onOpenCallBack}>
      <Collapse.Header>
        <h5 className="text-h5 flex-1">{item.title}</h5>
      </Collapse.Header>
      {item.text && (
        <Collapse.Body>
          <div className="body-medium text-white text-opacity-50" dangerouslySetInnerHTML={{ __html: item.text }}></div>
        </Collapse.Body>
      )}
    </Collapse>
  );
};
const Faq = ({ faq }: any) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
      {faq.map((item: any, i: number) => (
        <FaqItem item={item} key={i} />
      ))}
    </div>
  );
};

export default Faq;
