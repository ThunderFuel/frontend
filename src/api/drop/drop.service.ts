import { ThunderURL } from "../index";

export enum BLOCK_TYPE {
  Infinity,
  ImageText,
  SingleImage,
  VideoText,
  SingleVideo,
}

export enum DROP_STATUS {
  MINT_LIVE,
  MINT_SOON,
  MINT_OUT,
}

export default {
  getDropDetail: (dropId: any = 1) => {
    return ThunderURL.get<any>(`v1/drop/detail?id=${dropId}`);
  },
  getDrops: (params: any) => {
    return ThunderURL.get<any[]>("v1/drop/drops", { params });
  },
};
