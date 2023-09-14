import React, { useState } from "react";
import Carousel from "components/Carousel";
import UseNavigate from "hooks/useNavigate";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "icons";
import marketplaceService from "api/marketplace/marketplace.service";
import Button from "components/Button";

import "./HotDrops.css";

const HotDrops = () => {
  const navigate = UseNavigate();
  const [items, setItems] = useState<any[]>([]);

  const getCollectionItems = async () => {
    try {
      const response = await marketplaceService.getMarketplace({
        page: 1,
        size: 4,
      });
      const items = response.data
        .map((responseItem) => {
          return {
            description: responseItem.description,
            banner: responseItem.banner,
            name: responseItem.name,
            id: responseItem.id,
          } as any;
        })
        .slice(0, 5);

      console.log(items);

      setItems(items);
    } catch (e) {
      setItems([]);
    }
  };

  React.useEffect(() => {
    getCollectionItems();
  }, []);

  return (
    <div className="min-h-[440px]">
      <Carousel pause={"hover"} prevIcon={<IconChevronLeft />} prevLabel="" nextIcon={<IconChevronRight />} nextLabel="">
        {items.map((item, k) => {
          return (
            <Carousel.Item key={k}>
              <div className="flex min-h-[440px] w-full border-b border-gray bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.banner})` }}>
                <div className="flex flex-col justify-between px-10 py-5 border-r border-gray bg-bg" style={{ width: "440px" }}>
                  <div className="flex flex-col gap-5">
                    <h2 className="text-h2 text-white">{item.name}</h2>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="body-medium text-white text-overflow-2">{item.description}</div>
                    <Button className="uppercase btn-sm" onClick={() => navigate.collectionNavigate(item.id, item.slug)}>
                      explore collectıon <IconArrowRight />
                    </Button>
                  </div>
                </div>
                <div className="hotdrop-slide" />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotDrops;
