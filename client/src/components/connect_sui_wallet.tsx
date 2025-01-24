'use client';

import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';

export default function ConnectSuiWallet() {
  const { currentAccount } = useWalletKit();

  return (
    <div>
      <ConnectButton
        connectText="Connect Wallet"
        connectedText={`Connected: ${
          currentAccount ? currentAccount.address : 'N/A'
        }`}
      />
    </div>
  );
}
