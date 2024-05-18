import React from "react";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import Img from "components/Img/Img";

const NftImages = ({ collectionItems }: { collectionItems: any[] }) => {
  const items = collectionItems.slice(0, 5);

  return (
    <ul className="px-4 flex gap-2">
      {items.map((item, i) => (
        <li key={i} className="w-full lg:w-14 lg:h-14 overflow-hidden">
          <Link to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item.tokenId })}>
            {item.image ? <Img src={item.image} alt={i.toString()} className="rounded-md" /> : <div className="w-full h-full bg-gray rounded-md"></div>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NftImages;
