import React, { useState } from "react";
import Carousel from "components/Carousel";
import UseNavigate from "hooks/useNavigate";
import { IconArrowRight, IconChevronLeft, IconChevronRight, IconHotDropLoading } from "icons";
import marketplaceService from "api/marketplace/marketplace.service";
import Button from "components/Button";

import "./HotDrops.css";

const HotDrops = () => {
  const navigate = UseNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCollectionItems = async () => {
    try {
      setIsLoading(true);
      const response = await marketplaceService.getMarketplace({
        page: 1,
        pageSize: 4,
      });
      const items = response.data.slice(0, 5).map((responseItem) => {
        const banners = responseItem.solds
          .map((item) => item.token.image)
          .filter((image) => !!image)
          .slice(0, 3);

        return {
          description: responseItem.description,
          banner: responseItem.banner,
          banners: banners,
          name: responseItem.name,
          id: responseItem.id,
        } as any;
      });

      setItems(items);
    } catch (e) {
      setItems([]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getCollectionItems();
  }, []);

  return (
    <div className="min-h-[440px]">
      {isLoading ? (
        <div className="flex gap-10 w-full h-full bg-bg grid-skeleton text-left">
          <IconHotDropLoading className="text-gray" />
          <div className="w-full min-h-[440px] bg-bg-light" />
        </div>
      ) : (
        <Carousel pause={"hover"} prevIcon={<IconChevronLeft />} prevLabel="" nextIcon={<IconChevronRight />} nextLabel="" defaultActiveIndex={0}>
          {items.map((item, k) => {
            return (
              <Carousel.Item key={k}>
                <div className="flex min-h-[440px] w-full border-b border-gray bg-[length:auto_190px] lg:bg-cover bg-top lg:bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.banner})` }}>
                  <div className="flex flex-col justify-end lg:justify-between px-5 lg:px-10 py-5 border-r border-gray lg:bg-bg w-full lg:w-[440px] gap-10 lg:gap-0">
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
                  <div className="hotdrop-slide">
                    {!item.banner && item.banners.length ? (
                      <div className="overflow-hidden">
                        <div className="min-h-[440px] grid grid-cols-3 -mx-40">
                          {item.banners.map((image: string, index: number) => (
                            <div className="bg-cover bg-center bg-no-repeat" key={`${index}_${image}`} style={{ backgroundImage: `url(${image})` }} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default HotDrops;
