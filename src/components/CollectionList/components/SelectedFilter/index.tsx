import React from "react";
import { useCollectionListContext } from "../../CollectionListContext";

const ClearFilterButton = () => {
  return (
    <div>
      <div className="inline-flex cursor-pointer body-medium text-white p-2.5 rounded-md border border-gray bg-gray hover:border-white">Clear Filters</div>
    </div>
  );
};
const Index = () => {
  const { params } = useCollectionListContext();
  console.log(Object.entries(params));

  return (
    <div className="flex flex-col gap-2 px-5">
      <ClearFilterButton />
    </div>
  );
};

export default Index;
