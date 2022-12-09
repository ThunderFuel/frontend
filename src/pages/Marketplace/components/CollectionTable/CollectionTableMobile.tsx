import React from "react";
import clsx from "clsx";
import { ICollectionTableHeader } from "./CollectionTable";

import "./CollectionTable.css";

const CollectionTableMobile = ({
  headers = [],
  items = [],
  footerSlot,
}: {
  headers: ICollectionTableHeader[];
  items: any[];
  footerSlot?: JSX.Element;
}) => {
  const FooterSlot = footerSlot || null;

  return (
    <div className="collection-table">
      <div className="border-b border-gray pb-10">
        <div className="container">
          <div className="tbody">
            {items.map((item, key) => (
              <div key={key} className={clsx("tr")}>
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

export default CollectionTableMobile;
