import React from "react";
import Modal from "components/Modal";
import TabBase from "components/Tab";
import Button from "components/Button";
import Avatar from "components/Avatar";
import { IconPlus } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { useProfile } from "../ProfileContext";
import { addressFormat } from "utils";
import userService from "../../../api/user/user.service";
import { setUser } from "../../../store/walletSlice";

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

const ButtonFollow = ({ followerId }: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.wallet);
  const isFollow = !!user?.follows?.find((follow: any) => follow.userId === user.id);

  const onFollow = async (e: any) => {
    e.stopPropagation();
    try {
      const { data: isValid } = await userService.followUser({
        userId: user.id,
        followerId: followerId,
        follow: !isFollow,
      });
      if (isValid) {
        const response = await userService.getUser({
          id: user.id,
          includes: [0, 1, 2, 3, 4],
        });
        dispatch(setUser(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return !isFollow ? (
    <Button className="w-[163px] btn-secondary btn-sm !bg-white !text-black" onClick={onFollow}>
      FOLLOW <IconPlus />
    </Button>
  ) : (
    <Button className="w-[163px] btn-secondary btn-sm" onClick={onFollow}>
      FOLLOWING
    </Button>
  );
};
const FollowItem = ({ item, onClose }: any) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.wallet);
  const isOwn = user.id === item.userId;

  return (
    <div
      className="flex w-full items-center justify-between border border-gray rounded-md py-3 px-2 cursor-pointer"
      onClick={() => {
        navigate(PATHS.USER, { userId: item.userId });
        onClose();
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar image={item.image} userId={item.userId} className="w-8 h-8" />
        <div>
          <h6 className="text-h6 text-white">{item.userName ?? addressFormat(item.contractAddress)}</h6>
          <div className="text-headline-01 text-gray-light mt-2">{item.followerCount} FOLLOWERS</div>
        </div>
      </div>
      {!isOwn ? <ButtonFollow followerId={item.userId} /> : null}
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
            return <FollowItem item={item} onClose={onClose} key={k} />;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSocial;
