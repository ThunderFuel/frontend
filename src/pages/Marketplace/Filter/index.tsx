import React from "react";
import { useIsMobile } from "hooks/useIsMobile";
import MobileFilter from "./MobileFilter";
import Filter from "./Filter";

const Index = () => {
  return useIsMobile() ? <MobileFilter /> : <Filter />;
};

export default Index;
