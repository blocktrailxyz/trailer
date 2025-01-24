'use client';

import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { useWalletKit } from "@mysten/wallet-kit";
import * as verify from "@mysten/sui/verify"

export default function SendTransaction() {
  const { currentAccount } = useWalletKit();

  const handleTransaction = async () => {

    if(!currentAccount) {
      alert('Wallet not connected')
      return false;
    }
    // const client = new SuiClient({
    //   url: getFullnodeUrl('testnet'),
    // });

    // 1. **Obtain or Generate a Keypair**
    //    - **Option 1: From Mnemonic (Recommended for Security)**
    //      const mnemonic = 'your_mnemonic_phrase';
    //      const keypair = await Ed25519Keypair.fromMnemonic(mnemonic);
    //    - **Option 2: From Private Key (Not Recommended for Production)**
    //      const privateKey = Uint8Array.from([/* ... your private key bytes ... */]);
    //      const keypair = Ed25519Keypair.fromSecretKey(privateKey);

    // 2. Get the address from the keypair
    const keypair = new Ed25519Keypair();

    const message = `Please sign this message: ${keypair.getPublicKey()}}`;
    const encodedMessage = new TextEncoder().encode(message);
    const { signature } = await keypair.signPersonalMessage(encodedMessage);

    const publicKey = verify.verifyPersonalMessageSignature(encodedMessage, signature);
    console.log(`publicKey: ${publicKey}`)
    console.log(`sui address: ${(await publicKey).toSuiAddress()}`)
  };

  return (
    <button onClick={handleTransaction} disabled={!currentAccount}>
      { currentAccount ? 'Send Transaction' : 'Connect Wallet First' }
    </button>
  );
}
