import React from "react";
import offerService from "api/offer/offer.service";
import SidebarFilter from "./components/SidebarFilter";
import OfferList from "./components/OfferList";

const filterItems = [
  {
    value: true,
    text: "Offers Received",
    count: 0,
  },
  {
    value: false,
    text: "Offers Made",
    count: 0,
  },
];
const Offer = () => {
  const [offers, setOffers] = React.useState([] as any);
  const [filterValue, setFilterValue] = React.useState(true);
  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: 16,
      page: 1,
    });
    const data = response.data.map((item: any) => ({
      ...item,
      isOwn: item.takerUserId === 16,
    }));
    setOffers(data);
  };
  React.useEffect(() => {
    fetchOffers();
  }, []);

  const getOffers = React.useMemo(() => {
    if (filterValue === null) {
      return offers;
    }

    return offers.filter((item: any) => item.isOwn === filterValue);
  }, [offers, filterValue]);
  const getFilterItems = React.useMemo(() => {
    filterItems[0].count = offers.filter((item: any) => item.isOwn).length;
    filterItems[1].count = offers.filter((item: any) => !item.isOwn).length;

    return filterItems;
  }, [offers]);

  return (
    <div className="flex w-full h-full">
      <SidebarFilter filterItems={getFilterItems} value={filterValue} onChange={(value: any) => setFilterValue(value)} />
      <OfferList offers={getOffers} />
    </div>
  );
};

export default Offer;
