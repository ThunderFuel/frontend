import React from "react";
import { useCollectionListContext } from "../../CollectionListContext";
import { IconCircleRemove, IconCircleRemoveWhite } from "../../../../icons";

const ClearFilterButton = ({ onClick }: any) => {
  return (
    <div>
      <div className="inline-flex cursor-pointer body-medium text-white p-2.5 rounded-md border border-gray bg-gray hover:border-white" onClick={onClick}>
        Clear Filters
      </div>
    </div>
  );
};
const SelectedFilterItem = ({ children, onClick }: any) => {
  return (
    <div>
      <div className="inline-flex body-medium text-white p-2.5 gap-2 group rounded-md border border-gray hover:bg-bg-light">
        {children}
        <IconCircleRemove className="cursor-pointer text-gray group-hover:hidden" />
        <IconCircleRemoveWhite className="hidden cursor-pointer text-gray group-hover:flex" onClick={onClick} />
      </div>
    </div>
  );
};
const Index = () => {
  const { params, resetParams } = useCollectionListContext();

  console.log(params);
  if (!Object.keys(params).length) {
    return null;
  }

  const onRemove = () => {
    console.log("remove");
  };

  return (
    <div className="flex flex-row gap-2 px-5">
      <ClearFilterButton onClick={resetParams} />
      {Object.values(params).map((param: any, i) => {
        if (Array.isArray(param)) {
          return param.map((p) => (
            <SelectedFilterItem key={i} onClick={onRemove}>
              {p}
            </SelectedFilterItem>
          ));
        } else if (param.min || params.max) {
          return Object.keys(param).map((key) => {
            return (
              <SelectedFilterItem key={i} onClick={onRemove}>
                {`${param[key]} ${key === "min" ? ">" : "<"}`}
              </SelectedFilterItem>
            );
          });
        } else {
          return (
            <SelectedFilterItem key={i} onClick={onRemove}>
              {param}
            </SelectedFilterItem>
          );
        }
      })}
    </div>
  );
};

export default Index;
