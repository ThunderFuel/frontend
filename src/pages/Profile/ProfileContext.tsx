import React, { createContext, ReactNode, useContext } from "react";
import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";
import offerService from "api/offer/offer.service";
import collectionService, { ActivityFilters } from "api/collections/collections.service";
import { IconBid, IconMarketBasket, IconQuarry, IconTag, IconTelegram } from "icons";

export const enum FollowType {
  Followers = 0,
  Follows = 1,
}

interface IProfileContext {
  userInfo: any;
  socialActiveTab: any;
  onSetSocialActiveTab: any;
  onFollow: ({ isFollow, followUser }: { isFollow: boolean; followUser: IUserResponse }) => void;
  options?: any;
}

export const ProfileContext = createContext<IProfileContext>({} as any);

const ProfileProvider = ({ userId, options, children }: { userId: any; options: any; children: ReactNode }) => {
  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [] } as any);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);

  const getOffer = async () => {
    const response = await offerService.getOffer({
      userId: userInfo.id,
      page: 1,
    });

    return response?.data.shift();
  };
  const getActivity = async () => {
    try {
      const response = await collectionService.getActivity({
        userId: userInfo.id,
      });

      const lastActivity = response?.data.filter((activity) => activity.activityType !== ActivityFilters.Offers).shift();
      const filter = {
        [ActivityFilters.Mints]: { icon: IconQuarry, name: "Mints" },
        [ActivityFilters.Sales]: { icon: IconMarketBasket, name: "Sale" },
        [ActivityFilters.Transfers]: { icon: IconTelegram, name: "Transferred" },
        [ActivityFilters.Listings]: { icon: IconTag, name: "Listed" },
        [ActivityFilters.Bids]: { icon: IconBid, name: "Placed bid to" },
      }[lastActivity?.activityType as number];

      return {
        ...lastActivity,
        type: filter?.name,
        typeIcon: filter?.icon,
      };
    } catch (e) {
      console.log(e);

      return {};
    }
  };
  const fetchUserProfile = async () => {
    setUserInfo({ tokens: [], likedTokens: [] } as any);
    try {
      const [response, lastOffer, lastActivity] = await Promise.all([
        await userService.getUser({
          id: userId,
          includes: [0, 1, 2, 3, 4],
        }),
        getOffer(),
        getActivity(),
      ]);

      setUserInfo({
        ...response.data,
        lastOffer,
        lastActivity,
      } as any);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const onSetSocialActiveTab = (value: any) => {
    setSocialActiveTab(value);
  };

  const onFollow = async ({ isFollow, followUser }: { isFollow: boolean; followUser: IUserResponse }) => {
    try {
      const { data: isValid } = await userService.followUser({
        userId: followUser.id,
        followerId: userInfo.id,
        follow: !isFollow,
      });
      if (isValid) {
        await fetchUserProfile();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    userInfo,
    socialActiveTab,
    onSetSocialActiveTab,
    onFollow,
    options,
  };

  return !!userInfo && <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
