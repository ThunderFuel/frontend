import React from "react";
import clsx from "clsx";

import "./CollectionTable.css";

export interface ICollectionTableHeader {
  key: string;
  text: string;
  className?: string;
  colspan?: number;
  render?: (any?: any) => void;
}

const CollectionTable = ({
  headers = [],
  items = [],
  footerSlot,
}: {
  headers: ICollectionTableHeader[];
  items: any[];
  footerSlot: JSX.Element;
}) => {
  const FooterSlot = footerSlot || null;

  const gridCols = headers.reduce((total, item) => {
    total += item.colspan || 1;

    return total;
  }, 0);

  return (
    <div className="collection-table">
      <div className="thead">
        <div className="container">
          <div className={clsx("tr", `grid-cols-${gridCols}`)}>
            {headers.map((header) => (
              <div key={header?.key} className={clsx("th", `col-span-${header.colspan || 1}`, header?.className)}>
                {header?.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-gray pb-10">
        <div className="container">
          <div className="tbody">
            {items.map((item, key) => (
              <div key={key} className={clsx("tr", `grid-cols-${gridCols}`, "pl-4")}>
                {headers.map((header, index) => (
                  <div
                    key={`${key}_${index}`}
                    className={clsx("td", `col-span-${header.colspan ?? 1}`, header.className)}
                  >
                    {header.render ? header.render(item) : item?.[header.key] ?? "-"}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {FooterSlot}
        </div>
      </div>
    </div>
  );
};

export default CollectionTable;
