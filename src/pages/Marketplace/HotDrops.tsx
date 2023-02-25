import React from "react";
import { AssetHotdrop1, AssetHotdrop2, AssetHotdrop3, AssetHotdrop4, AssetHotdrop5, AssetHotdrop6, AssetHotdrop7, AssetHotdrop8 } from "assets";
import { useIsMobile } from "hooks/useIsMobile";
import EthereumPrice from "components/EthereumPrice";
import { chunk } from "../../utils";
import Carousel from "components/Carousel";
import clsx from "clsx";
import { useIsWideScreen } from "../../hooks/useIsWideScreen";
import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";
import collectionsService from "api/collections/collections.service";
import { IconChevronLeft, IconChevronRight } from "../../icons";

const HotDrops = () => {
  const isWideScreen = useIsWideScreen();
  const navigate = UseNavigate();
  const chunkSize = useIsMobile() ? 1 : isWideScreen ? 5 : 4;
  const hotdrops = [
    { image: AssetHotdrop1, collectionName: "9 zones", id: 25 },
    { image: AssetHotdrop2, collectionName: "Devious Peoples", id: 26 },
    { image: AssetHotdrop3, collectionName: "Pudgy Penguins", id: 17 },
    { image: AssetHotdrop4, collectionName: "Doodles", id: 15 },
    { image: AssetHotdrop5, collectionName: "CLONE X - X TAKASHI MURAKAMI", id: 22 },
    { image: AssetHotdrop6, collectionName: "Moonbirds", id: 18 },
    { image: AssetHotdrop7, collectionName: "Cool Cats", id: 20 },
    { image: AssetHotdrop8, collectionName: "BEANZ Official", id: 23 },
  ];
  const hotdropList = chunk(hotdrops, chunkSize);

  interface floorData {
    collectionId?: number;
    price?: number;
  }

  const [floor, setfloor] = React.useState<floorData[]>([]);

  function fetchFloor() {
    const ids = hotdrops.map((item) => item.id);
    collectionsService.getCollectionFloor(ids).then((res) => {
      setfloor(res.data);
    });
  }

  React.useEffect(() => {
    fetchFloor();
  }, []);

  return (
    <div className="container-fluid flex flex-col gap-5">
      <h3 className="text-white text-h3">Hot Drops</h3>
      <Carousel pause={"hover"} prevIcon={<IconChevronLeft />} prevLabel="" nextIcon={<IconChevronRight />} nextLabel="">
        {hotdropList.map((items, k) => {
          return (
            <Carousel.Item key={k}>
              <div className={clsx("grid gap-3", `lg:grid-cols-${isWideScreen ? 5 : 4}`)}>
                {items.map((item: any) => {
                  return (
                    <div key={`${k}_${item.id}`} className="border border-gray bg-bg-light text-white cursor-pointer" onClick={() => navigate(PATHS.COLLECTION, { collectionId: item.id })}>
                      <div className="overflow-hidden">
                        <img src={item.image} className="w-full transition-all duration-300 hover:scale-[110%]" alt={"hot-drop-image"} />
                      </div>
                      <div className="flex flex-col gap-3 px-4 py-3">
                        <h5 className="text-head5 font-spaceGrotesk text-overflow">{item.collectionName}</h5>
                        <div className="flex items-center gap-2.5">
                          <span className="text-headline-01 uppercase text-gray-light">floor:</span>
                          <EthereumPrice price={floor.find((obj) => obj.collectionId === item.id)?.price} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotDrops;
