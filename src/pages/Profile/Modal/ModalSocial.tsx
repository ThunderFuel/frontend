import React from "react";
import Modal from "components/Modal";
import TabBase from "components/Tab";
import Button from "components/Button";
import Avatar from "components/Avatar";
import { IconPlus } from "icons";
import { useAppSelector } from "store";
import useNavigate from "../../../hooks/useNavigate";
import { PATHS } from "../../../router/config/paths";
import { useProfile } from "../ProfileContext";

const ModalTitle = () => {
  return <h6 className="text-h5 text-white">Social</h6>;
};

const Tab = ({ initTab, onChange }: any) => {
  if (initTab === null) {
    return null;
  }

  return (
    <TabBase initTab={initTab} onChange={onChange}>
      <TabBase.Item className="sm" id={0}>
        FOLLOWERS
      </TabBase.Item>
      <TabBase.Item className="sm" id={1}>
        FOLLOWING
      </TabBase.Item>
    </TabBase>
  );
};
const FollowItem = ({ item }: any) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.wallet);
  console.log(user);
  const isFollow = !!user?.follows?.find((follow: any) => follow.userId === user.id);
  const onFollow = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex w-full items-center justify-between border border-gray rounded-md py-3 px-2 cursor-pointer"
      onClick={() => {
        navigate(PATHS.USER, { userId: item.userId });
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar image={item.image} userId={item.id} className="w-8 h-8" />
        <div>
          <h6 className="text-h6 text-white">{item.userName}</h6>
          <div className="text-headline-01 text-gray-light mt-2">{item.followerCount} FOLLOWERS</div>
        </div>
      </div>
      {!isFollow ? (
        <Button className="btn-secondary btn-sm !bg-white !text-black" onClick={onFollow}>
          FOLLOW <IconPlus />
        </Button>
      ) : null}
    </div>
  );
};

const ModalSocial = () => {
  const { socialActiveTab, onSetSocialActiveTab, userInfo } = useProfile();
  const activeItems = React.useMemo(() => {
    if (socialActiveTab === null) {
      return [];
    }

    return [userInfo?.followers, userInfo?.follows];
  }, [socialActiveTab]);
  const onClose = () => {
    onSetSocialActiveTab(null);
  };

  return (
    <Modal show={socialActiveTab !== null} onClose={onClose} title="Social" modalTitle={<ModalTitle />} bodyClassName="!w-[480px]">
      <div className="flex flex-col p-5 gap-5">
        <Tab initTab={socialActiveTab} onChange={onSetSocialActiveTab} />
        <div className="flex flex-col w-full gap-2">
          {activeItems?.[socialActiveTab]?.map((item: any, k: number) => {
            return <FollowItem item={item} key={k} />;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSocial;
