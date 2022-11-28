import React from "react";
import clsx from "clsx";

import "./CollectionTable.css";

export interface ICollectionTableHeader {
  key: string;
  text: string;
  className?: string;
  render?: (any?: any) => void;
}

const CollectionTable = ({
  headers = [],
  items = [],
  footerSlot = React.Fragment,
}: {
  headers: ICollectionTableHeader[];
  items: any[];
  footerSlot: React.ReactNode;
}) => {
  const FooterSlot = footerSlot;

  return (
    <div className="collection-table">
      <div className="thead">
        <div className="container">
          <div className="tr grid-cols-9">
            {headers.map((header) => (
              <div key={header?.key} className={clsx("th", header?.className)}>
                {header?.text}
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray pb-10">
        <div className="container">
          <div className="tbody">
            {items.map((item, key) => (
              <div key={key} className={clsx("th", `grid-cols-${headers.length}`)}>
                {headers.map((header, index) => (
                  <div key={`${key}_${index}`} className={clsx("td", " col-span-2")}>
                    {header.render ? header.render(item?.[header.key]) : item?.[header.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {!!FooterSlot ?? <FooterSlot />}
        </div>
      </div>
    </div>
  );
};

export default CollectionTable;
