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
  public static async verify(message: string, signature: string, address: string): Promise<boolean> {
    const messageBytes = new TextEncoder().encode(message);
    try {
      // Verify the signature
      const publickey = await verifyPersonalMessageSignature(messageBytes, signature);
      const suiAddress = publickey.toSuiAddress();

      if (suiAddress !== address)
        return Promise.resolve(false)

      return Promise.resolve(true);
    }
    catch {
      return Promise.resolve(false);
    }
  }
}

export default SuiKeypairSigner;