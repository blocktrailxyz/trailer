import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';

class SuiKeypairSigner {
  /**
   * Sign a personal message using a provided keypair
   * @param keypair - Ed25519Keypair instance
   * @param message - Message to sign
   * @returns Signed message
   */
  public static async sign(keypair: Ed25519Keypair, message: string): Promise<string> {
    const messageBytes = new TextEncoder().encode(message);
    const { signature } = await keypair.signPersonalMessage(messageBytes);
    return signature;
  }

  /**
   * Verify a signed message
   * @param message - Original message
   * @param signature - Signature to verify
   * @param address - Expected SUI address
   * @returns Verified SUI address
   */
  public static async verify(message: string, signature: string, address: string): Promise<string> {
    const messageBytes = new TextEncoder().encode(message);

    // Verify the signature
    const publickey = await verifyPersonalMessageSignature(messageBytes, signature, { address });
    const suiAddress = publickey.toSuiAddress();

    if (suiAddress !== address) {
      throw new Error(`Address mismatch: expected ${address}, but got ${suiAddress}`);
    }

    return suiAddress;
  }
}

export default SuiKeypairSigner;

// 1. **Obtain or Generate a Keypair**
//    - **Option 1: From Mnemonic (Recommended for Security)**
//      const mnemonic = 'your_mnemonic_phrase';
//      const keypair = await Ed25519Keypair.fromMnemonic(mnemonic);
//    - **Option 2: From Private Key (Not Recommended for Production)**
//      const privateKey = Uint8Array.from([/* ... your private key bytes ... */]);
//      const keypair = Ed25519Keypair.fromSecretKey(privateKey);

// 2. Get the address from the keypair
// const keypair = new Ed25519Keypair();