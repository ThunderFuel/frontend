import React, { useState } from "react";
import Carousel from "components/Carousel";
import UseNavigate from "hooks/useNavigate";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "icons";
import marketplaceService from "api/marketplace/marketplace.service";
import Button from "components/Button";

import "./HotDrops.css";
import { PATHS } from "../../router/config/paths";

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
    <div className="container-fluid">
      <Carousel pause={"hover"} prevIcon={<IconChevronLeft />} prevLabel="" nextIcon={<IconChevronRight />} nextLabel="">
        {items.map((item, k) => {
          return (
            <Carousel.Item key={k}>
              <div className="flex min-h-[440px] w-full">
                <div className="flex flex-col justify-between w-4/12">
                  <div className="flex flex-col gap-5">
                    <h4 className="text-h4 text-white">{item.name}</h4>
                  </div>
                  <div className="flex flex-col gap-5 py-5">
                    <div className="body-medium text-white text-overflow-2">{item.description}</div>
                    <Button className="uppercase" onClick={() => navigate(PATHS.COLLECTION, { collectionId: item.id })}>
                      explore collectıon <IconArrowRight />
                    </Button>
                  </div>
                </div>
                <div className="hotdrop-slide" style={{ backgroundImage: `url(${item.banner})` }} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotDrops;
