/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletApi from "./api/walletApi";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [data, setData] = useState<any>(null);

  useEffect(() =>{
    if (connected && publicKey) {
      const walletAddress = publicKey.toBase58();
      const registerWallet = async () => {
        try {
          const walletApi = new WalletApi();
          const response = await walletApi.register(walletAddress, 'sol');
          setData(response.data);
        } catch (error) {
          console.error("Error register wallet:", error);
        }
      };
      registerWallet();
    }
  }, [connected]);

  return (
    <div className="">
      <div>
          {publicKey ? (
            <p>Wallet Address: {publicKey.toBase58()}</p>
          ) : (
            <p>Not connected</p>
          )}
      </div>
      <WalletMultiButton style={{}}  />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
