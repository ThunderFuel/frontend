import React from "react";

import "./Item.css";

const DropItem = ({ item }: any) => {
  console.log(item);

  return (
    <div style={{ background: item.color }}>
      <div className="drop-item-container" style={{ backgroundImage: `url(${item.image})` }}></div>
    </div>
  );
};

export default DropItem;
