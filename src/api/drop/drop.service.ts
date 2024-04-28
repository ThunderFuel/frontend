import { ThunderURL } from "../index";

export enum BLOCK_TYPE {
  InfinityBlock,
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
export const FUELET_DROP_ID = 18;

const THUNDER_CREATOR = {
  image: "https://cdn.thundernft.market/assets/drop/f330f6a4-37a8-4d28-9af2-5953fff928f1.png",
  name: "Thunder",
};

const FLUID_CREATOR = {
  name: "Fluid",
  image: "https://thassetstorage.blob.core.windows.net/assets/drop/f330f6a4-37a8-4d28-9af2-5953fffasd334.png",
};
const FUELET_CREATOR = {
  name: "Fuelet",
  image: "https://thassetstorage.blob.core.windows.net/assets/fuelet-logo.png",
};

function getCreator(dropId: any) {
  const id = Number(dropId);
  if (FLUID_DROP_IDS.includes(id)) {
    return FLUID_CREATOR;
  }
  if (FUELET_DROP_ID === id) {
    return FUELET_CREATOR;
  }

  return THUNDER_CREATOR;
}

function modifyResponseCreator(response: any) {
  const dropId = response.data.id;
  response.data.creator = getCreator(dropId);

  return response;
}

export default {
  getDropDetail: async (dropId: any = 1, walletAddress: any) => {
    const response = await ThunderURL.get<any>("v1/drop/detail", {
      params: {
        id: dropId,
        walletAddress: walletAddress,
      },
    });
    response.data.blocks = response.data.blocks.map((block: any) => {
      if (block.type === BLOCK_TYPE.InfinityBlock) {
        block.hidden = true;
      }

      return block;
    });

    return modifyResponseCreator(response);
  },
  getDrops: async (params: any) => {
    const response = await ThunderURL.get<any[]>("v1/drop/drops", { params });
    response.data = response.data.map((item: any) => {
      item.creator = getCreator(item.id);

      return item;
    });

    return response;
  },
};
