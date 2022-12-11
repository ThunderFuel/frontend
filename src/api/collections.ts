export default {
  async getCollections() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((item) => ({
      name: `collection-${item}`,
      image: item,
      floor: Math.random(),
      price: Math.random(),
      lastSale: Math.random(),
      owner: Math.random(),
      timeListed: Math.random(),
    }));
  },
};
