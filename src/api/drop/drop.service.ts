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
  getDropDetail: async (dropId: any = 1) => {
    const response = await ThunderURL.get<any>(`v1/drop/detail?id=${dropId}`);
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
