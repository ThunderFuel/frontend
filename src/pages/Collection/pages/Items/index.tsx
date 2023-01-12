import React from "react";
import ItemProvider from "./ItemContext";
import Items from "./Items";

const Index = () => {
  return (
    <ItemProvider>
      <Items />
    </ItemProvider>
  );
};

export default Index;
