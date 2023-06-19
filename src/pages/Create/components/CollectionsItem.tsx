import React from "react";
import Button from "components/Button";
import { IconPencil } from "icons";
import UseNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { useAppSelector } from "../../../store";

interface ICollectionsItem {
  coverImage: string;
  name: string;
  creatorImage: string;
}

const EDITABLE_USER = 708;

const CollectionsItem = ({ coverImage, name, creatorImage }: ICollectionsItem) => {
  const { user } = useAppSelector((state) => state.wallet);
  const navigate = UseNavigate();

  return (
    <div className="flex flex-col border border-gray rounded-[10px]">
      <img src={coverImage} className="h-[120px] w-[334px] rounded-t-[10px]" />
      <div className="flex py-2.5 px-[15px] gap-2.5">
        <img src={creatorImage} className="h-[72px] w-[72px] rounded-[3px]" />
        <div className="flex flex-col justify-between">
          <h6 className="text-head6 font-spaceGrotesk">{name}</h6>
          {EDITABLE_USER === user.id && (
            <Button className="btn-secondary btn-sm h-10" onClick={() => navigate(PATHS.COLLECTION_EDIT, { collectionId: 0 })}>
              EDIT COLLECTION <IconPencil />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsItem;
