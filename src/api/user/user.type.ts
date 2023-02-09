export interface ISocialMedia {
  id: number;
  collectionId: number;
  userId: number;
  type: number;
  url: string;
}

export interface ICreateUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  contractAddress: string;
  banner: string;
  image: string;
  socialMedias: ISocialMedia[];
  bio: string;
}

export interface IUserResponse {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: null | string;
  gender: null | string;
  contractAddress: null | string;
  image: null | string;
  banner: null | string;
  socialMedias: any[];
  tokens: any[];
  followers: any[];
  follows: any[];
  id: number;
  likedTokens: number[];
}

export interface IFollowParams {
  followerId: number;
  followId: number;
  follow: boolean;
}
