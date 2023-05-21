import React, { useState } from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";
import Collapse from "components/Collapse/Collapse";
import clsx from "clsx";

const FaqItem = ({ item }: any) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onOpenCallBack = (value: boolean) => {
    setIsActive(value);
  };

  return (
    <Collapse className={clsx("border-white border-opacity-10 transition-all", isActive && "bg-white bg-opacity-10")} onOpenCallBack={onOpenCallBack}>
      <Collapse.Header>
        <h5 className="text-h5">{item.title}</h5>
      </Collapse.Header>
      <Collapse.Body>
        <div className="body-medium text-white text-opacity-50">{item.text}</div>
      </Collapse.Body>
    </Collapse>
  );
};
const Faq = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="flex flex-col gap-5 w-full max-w-[800px]">
      {dropDetail.faq.map((item: any, i: number) => (
        <FaqItem item={item} key={i} />
      ))}
    </div>
  );
};

export default Faq;
