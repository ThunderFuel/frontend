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
        <span className="text-overflow">{children}</span>
        <IconCircleRemove className="cursor-pointer text-gray group-hover:hidden" />
        <IconCircleRemoveWhite className="hidden cursor-pointer text-gray group-hover:flex" onClick={onClick} />
      </div>
    </div>
  );
};
const Index = () => {
  const { params, setParams, deleteParams, resetParams } = useCollectionListContext();

  if (!Object.keys(params).length) {
    return null;
  }

  const onRemove = (paramKey: any, p: any) => {
    if (Array.isArray(params[paramKey])) {
      params[paramKey] = params[paramKey].filter((i: any) => i !== p);
      if (!params[paramKey].length) {
        deleteParams(paramKey);
      } else {
        setParams(params);
      }
    } else if (params[paramKey]?.min || params[paramKey]?.max) {
      delete params[paramKey][p];
      setParams(params);
    }
  };

  const paramItems = React.useMemo(() => {
    const tmpParamItems: any = [];
    Object.keys(params).forEach((paramKey: any, i) => {
      const param = params[paramKey];
      if (Array.isArray(param)) {
        param.forEach((p, key) => {
          tmpParamItems.push({
            paramKey,
            key: `${key}_${i}`,
            text: p,
          });
        });
      } else if (param.min || params.max) {
        Object.keys(param).forEach((key) => {
          tmpParamItems.push({
            paramKey,
            key: `${key}_${i}`,
            text: `${param[key]} ${key === "min" ? ">" : "<"}`,
          });
        });
      }
    });

    return tmpParamItems;
  }, [params]);

  console.log("musa", paramItems);

  return (
    <div className="flex flex-row flex-wrap gap-2 px-5">
      <ClearFilterButton onClick={resetParams} />
      {paramItems.map((item: any) => {
        return (
          <SelectedFilterItem key={item.key} onClick={() => onRemove(item.paramKey, item.text)}>
            {item.text}
          </SelectedFilterItem>
        );
      })}
    </div>
  );
};

export default Index;
