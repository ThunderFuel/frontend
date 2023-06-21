export const main = async () => {
  let orders = [];
  let tokenId = 0;
  // let temp = {
  //     "tokenId": tokenId,
  //     "price": 0.1,
  //     "priceType": 0,
  //     "expireTime": 1695236098
  // }

  for (let i = 1; i <= 50; i++) {
    tokenId = tokenId + 1;
    orders.push({
      tokenId: tokenId,
      price: 0.1,
      priceType: 0,
      expireTime: 1695236098,
    });
  }

  console.log(orders);
};

main().then(() => console.log("done"));
