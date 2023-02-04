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
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: { sortingType, pageSize, search, sweep, ...etcParams },
    setParams,
    deleteParams,
    resetParams,
  } = useCollectionListContext();

  if (!Object.keys(etcParams).length) {
    return null;
  }

  const onRemove = (paramKey: any, p: any) => {
    const paramValue = etcParams[paramKey]?.value;

    if (Array.isArray(paramValue)) {
      etcParams[paramKey].value = paramValue?.filter((i: any) => i !== p);
      if (!etcParams[paramKey].value.length) {
        deleteParams(paramKey);
      } else {
        setParams({});
      }
    } else if (paramValue?.min || paramValue?.max) {
      delete etcParams[paramKey][p];
      setParams(etcParams);
    }
  };

  const paramItems = React.useMemo(() => {
    const tmpParamItems: any = [];
    Object.keys(etcParams).forEach((paramKey: any, i) => {
      const paramValue = etcParams[paramKey].value;

      if (Array.isArray(paramValue)) {
        paramValue.forEach((p, key) => {
          tmpParamItems.push({
            paramKey,
            key: `${key}_${i}`,
            text: p,
          });
        });
      } else if (paramValue.min || paramValue.max) {
        Object.keys(paramValue).forEach((key) => {
          if (paramValue[key]) {
            tmpParamItems.push({
              paramKey,
              key: `${key}_${i}`,
              text: `${paramValue[key]} ${key === "min" ? ">" : "<"}`,
            });
          }
        });
      }
    });

    return tmpParamItems;
  }, [etcParams]);

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
