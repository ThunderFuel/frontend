import { randomBytes } from '@fuel-ts/keystore';
import { coinQuantityfy, ScriptTransactionRequest } from '@fuel-ts/providers';
import type { CoinQuantityLike } from '@fuel-ts/providers';

import { WalletUnlocked } from 'fuels';

export const seedTestWallet = async (wallet: WalletUnlocked, quantities: CoinQuantityLike[]) => {
  // Connect to the same Provider as wallet
  const resources = await wallet.getResourcesToSpend(quantities);

  // Create transaction
  const request = new ScriptTransactionRequest({
    gasLimit: 10000,
    gasPrice: 1,
  });

  request.addResources(resources);

  quantities
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(wallet.address, amount, assetId));
  const response = await wallet.sendTransaction(request);

  await response.wait();
};
