import React from "react";
import clsx from "clsx";
import Collapse from "components/Collapse";
import { useOfferContext } from "../OfferContext";
import Checkbox from "components/CheckBox";
import Radio from "components/Radio";
import { useAppSelector } from "store";

const CheckboxList = ({ filterItem, value = [], onChange }: any) => {
  const onClick = (checkedValue: any) => {
    const indexOf = value.indexOf(checkedValue);
    if (indexOf > -1) {
      value.splice(indexOf, 1);
    } else {
      value.push(checkedValue);
    }
    onChange(filterItem.type, value);
  };

  return filterItem.values.map((item: any, k: any) => {
    const isChecked = value.includes(item.value);

    return (
      <div key={k} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", isChecked ? "bg-gray" : "")}>
        <Checkbox checked={isChecked} onClick={() => onClick(item.value)} name="offer-type">
          <span className="body-medium">{item.text}</span>
        </Checkbox>
      </div>
    );
  });
};

const RadioList = ({ filterItem, value, onChange }: any) => {
  const onClick = (checkedValue: any) => {
    onChange(filterItem.type, checkedValue);
  };

  return filterItem.values.map((item: any, k: any) => {
    const isChecked = value === item.value;

    return (
      <div key={k} className={clsx("hover:bg-bg-light border border-gray rounded-md p-2.5 text-white", isChecked ? "bg-gray" : "")}>
        <Radio defaultChecked={isChecked} onClick={() => onClick(item.value)} name="offer-type">
          <span className="body-medium">
            {item.text} {item.count > 0 ? `(${item.count})` : null}
          </span>
        </Radio>
      </div>
    );
  });
};

const SidebarFilter = () => {
  const { onChangeFilterValue, filterValue, offers } = useOfferContext();
  const { user } = useAppSelector((state) => state.wallet);

  const filterItems: any = [
    {
      name: "Offer Type",
      component: RadioList,
      type: "offerType",
      values: [
        {
          value: 0,
          text: "Offers Received",
          count: 0,
        },
        {
          value: 1,
          text: "Offers Made",
          count: 0,
        },
      ],
    },
    {
      name: "Offer Status",
      component: CheckboxList,
      type: "offerStatus",
      values: [
        {
          value: 1,
          text: "Active Offers",
        },
        {
          value: 2,
          text: "Accepted Offers",
        },
        {
          value: 3,
          text: "Expired Offers",
        },
        {
          value: 0,
          text: "Canceled Offers",
        },
      ],
    },
  ];

  const onChange = (filterType: any, value: any) => {
    filterValue[filterType] = value;
    onChangeFilterValue(filterValue);
  };

  const getFilterItems = React.useMemo(() => {
    filterItems[0].values[0].count = offers.filter((item: any) => !item.isOfferMade && (user.id ? item.ownerId === user.id : true)).length;
    filterItems[0].values[1].count = offers.filter((item: any) => item.isOfferMade).length;

    return filterItems;
  }, [offers, filterValue]);

  return (
    <div className="sticky h-fit" style={{ top: "var(--headerHeight)" }}>
      <div className="py-5 pr-5 border-r border-gray w-60 flex flex-col gap-2.5">
        {getFilterItems.map((filterItem: any, index: number) => {
          const Component = filterItem.component;

          return (
            <Collapse key={index} isOpen={true}>
              <Collapse.Header>{filterItem.name}</Collapse.Header>
              <Collapse.Body>
                <Component filterItem={filterItem} value={filterValue[filterItem.type]} onChange={onChange} />
              </Collapse.Body>
            </Collapse>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarFilter;
