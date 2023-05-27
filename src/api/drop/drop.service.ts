import { ThunderURL } from "../index";

export enum BLOCK_TYPE {
  Infinity,
  ImageText,
  SingleImage,
  VideoText,
  SingleVideo,
}

export enum DROP_STATUS {
  MINT_NOW,
  MIN_SOON,
  MIN_OUT,
}

export default {
  getDropDetail: (dropId: any = 1) => {
    return ThunderURL.get<any>(`v1/drop/detail?id=${dropId}`);
  },
  getDrops: () => {
    return ThunderURL.get<any[]>("v1/drop/drops");
  },
};
