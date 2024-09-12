import React from "react";
import Collapse from "components/Collapse";
import CheckboxList from "./components/CheckboxList";
import RadioList from "./components/RadioList";
import RangeBar from "./components/RangeBar";
import RangeInputOptions from "./components/RangeInputOptions";
import RangeInput from "./components/RangeInput";
import { useCollectionListContext } from "../../CollectionListContext";

import CollectionCheckboxList from "./components/CollectionCheckboxList";
import SidebarFilterBase, { MobileSidebarFilter } from "components/SidebarFilter";

enum FilterComponentType {
  Input = 0,
  RadioList = 3,
  CheckboxList = 5,
  RangeBar = 3,
  RangeInput = 1,
  CollectionCheckboxList = 6,
}

const SidebarFilter = ({ className = "w-72" }: { className?: string }) => {
  const { displayType, setDisplayType, filters, params, setParams, deleteParams, options, isMobile, mobileFilterIsOpen, hideMobileFilter } = useCollectionListContext();

  const onChange = (name: any, value: any, type: number) => {
    if (Array.isArray(value) && !value.length) {
      deleteParams(name);
    } else {
      setParams({ [name]: { value, type } });
    }
  };

  const [getAttributeFilter, getFilter] = React.useMemo(() => {
    const tmpAttributeFilter: any[] = [];
    const tmpFilter: any[] = [];

    filters.forEach((filter: any, i: number) => {
      let DynamicComponent: any = RangeInputOptions;
      if (FilterComponentType.RadioList === filter.type) {
        DynamicComponent = RadioList;
      } else if (FilterComponentType.CheckboxList === filter.type) {
        DynamicComponent = CheckboxList;
      } else if (FilterComponentType.RangeBar === filter.type) {
        DynamicComponent = RangeBar;
      } else if (FilterComponentType.RangeInput === filter.type) {
        DynamicComponent = RangeInput;
      } else if (FilterComponentType.CollectionCheckboxList === filter.type) {
        DynamicComponent = CollectionCheckboxList;
      }

      const name = filter.name ?? i;
      const type = filter.type ?? 0;
      const value = params?.[name]?.value;
      const field = {
        name,
        type,
        value,
        dynamicComponent: DynamicComponent,
        filterData: filter.filterData,
        order: name.toLowerCase() === "status" ? 1 : 0,
        isOpen: ["status", "collections"].includes(name.toLowerCase()),
      };

      if (["price", "status", "raking", "collections"].includes(name.toLowerCase())) {
        tmpFilter.push(field);
      } else {
        tmpAttributeFilter.push(field);
      }
    });

    return [tmpAttributeFilter, tmpFilter.sort((a, b) => a.order - b.order).reverse()];
  }, [filters, params]);

  const SidebarComponent = isMobile ? MobileSidebarFilter : SidebarFilterBase;

  return (
    <SidebarComponent options={options} className={className} displayType={displayType} setDisplayType={setDisplayType} isOpen={mobileFilterIsOpen} onClose={hideMobileFilter} params={params}>
      <React.Fragment>
        {getFilter.map((item: any, i: number) => {
          const DynamicComponent = item.dynamicComponent;

          if (item?.filterData.length === 0) return <></>;

          return (
            <Collapse key={`${item.name}_${i}`} isOpen={item.isOpen}>
              <Collapse.Header>{item.name ?? "-"}</Collapse.Header>
              <Collapse.Body>
                <DynamicComponent
                  filterData={item.filterData}
                  name={item.name}
                  defaultChecked={item.value === params[item.name]}
                  value={item.value}
                  onChange={(name: any, value: any) => {
                    onChange(name, value, item.type);
                  }}
                />
              </Collapse.Body>
            </Collapse>
          );
        })}
        {getAttributeFilter.map((item: any, i: number) => {
          const DynamicComponent = item.dynamicComponent;

          return (
            <Collapse key={`${item.name}_${i}`}>
              <Collapse.Header>{item.name ?? "-"}</Collapse.Header>
              <Collapse.Body>
                <DynamicComponent
                  filterData={item.filterData}
                  name={item.name}
                  value={item.value}
                  onChange={(name: any, value: any) => {
                    onChange(name, value, item.type);
                  }}
                />
              </Collapse.Body>
            </Collapse>
          );
        })}
      </React.Fragment>
    </SidebarComponent>
  );
};

export default SidebarFilter;
