export interface ISocialMedia {
  id: number;
  collectionId: number;
  userId: number;
  type: number;
  url: string;
}

export interface ICreateUser {
  id: number;
  bio: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  contractAddress?: null | string;
  walletAddress: null | string;
  banner: string;
  image: string;
  socialMedias: ISocialMedia[];
}

export interface IUserResponse {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: null | string;
  gender: null | string;
  contractAddress: null | string;
  walletAddress: string;
  image: null | string;
  banner: null | string;
  socialMedias: any[];
  tokens: any[];
  followers: any[];
  follows: any[];
  id: number;
  likedTokens: null | any[];
  bio: any;
}

export interface IFollowParams {
  followerId: number;
  userId: number;
  follow: boolean;
}
