import React, { createContext, ReactNode, useContext } from "react";
import { IUserResponse } from "api/user/user.type";
import userService from "api/user/user.service";
import config from "../../config";

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
  tokens?: any;
  showBulkListing: boolean;
  setShowBulkListing: any;
}

export const ProfileContext = createContext<IProfileContext>({} as any);

const ProfileProvider = ({ userId, options, children }: { userId: any; options: any; children: ReactNode }) => {
  const [userInfo, setUserInfo] = React.useState<IUserResponse>({ tokens: [], likedTokens: [] } as any);
  const [tokens, setTokens] = React.useState<any>([]);
  const [socialActiveTab, setSocialActiveTab] = React.useState<any>(null);
  const [showBulkListing, setShowBulkListing] = React.useState<any>(null);

  const fetchUserProfile = async () => {
    setUserInfo({ tokens: [], likedTokens: [] } as any);
    try {
      const response = await userService.getUser({
        id: userId,
        includes: config.getConfig("userProfileIncludes"),
      });

      setUserInfo({
        ...response.data,
        tokens: [],
      });
    } catch (e) {
      console.log(e);
    }

    fetchUserProfileTokens();
  };
  const fetchUserProfileTokens = async () => {
    try {
      const response = await userService.getUser({
        id: userId,
        includes: config.getConfig("userProfileTokens"),
      });

      setTokens(response.data.tokens ?? []);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
    window.addEventListener("CompleteCheckout", () => {
      fetchUserProfile();
    });

    return () => {
      window.removeEventListener("CompleteCheckout", () => {
        fetchUserProfile();
      });
    };
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
    tokens,
    showBulkListing,
    setShowBulkListing,
  };

  return !!userInfo && <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
