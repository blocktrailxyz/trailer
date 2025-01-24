'use client';

import React, { ReactNode } from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit';

export default function WalletProvider({ children }: { children: ReactNode }) {
  return <WalletKitProvider>{children}</WalletKitProvider>;
}
