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

export const FLUID_DROP_IDS = [16, 17];
export const FLUID_WALLET_COUNT = 20;

export default {
  getDropDetail: async (dropId: any = 1, walletAddress: any) => {
    const response = await ThunderURL.get<any>("v1/drop/detail", {
      params: {
        id: dropId,
        walletAddress: walletAddress,
      },
    });
    response.data.blocks = response.data.blocks.map((block: any) => {
      if (block.type === BLOCK_TYPE.Infinity) {
        block.hidden = true;
      }

      return block;
    });

    return response;
  },
  getDrops: (params: any) => {
    return ThunderURL.get<any[]>("v1/drop/drops", { params });
  },
};
