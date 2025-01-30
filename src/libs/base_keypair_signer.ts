import { Wallet, hashMessage, verifyMessage } from "ethers";

export default class BaseKeypairSigner {
  /**
   * Signs a message using EIP-191 (personal sign) with the provided private key.
   * @param privateKey - The Ethereum private key (must start with '0x').
   * @param message - The message to sign.
   * @returns A promise resolving to the signature string.
   */
  static async sign(privateKey: string, message: string): Promise<string> {
    if (!privateKey.startsWith("0x")) {
      throw new Error("Private key must start with '0x'");
    }
    
    const wallet = new Wallet(privateKey);
    const hashedMessage = hashMessage(message); // Personal sign (EIP-191)
    return await wallet.signMessage(hashedMessage);
  }

  /**
   * Verifies a signed message and returns the recovered Ethereum address.
   * @param message - The original message.
   * @param signature - The signed message.
   * @returns The recovered Ethereum address.
   */
  static verify(message: string, signature: string, publicKey: string): Promise<boolean> {
    try {
      const hashedMessage = hashMessage(message); // Ensure verification uses EIP-191 hashing
      const ethAddress = verifyMessage(hashedMessage, signature);
      const result = publicKey == ethAddress

      return Promise.resolve(result);
    }
    catch {
      return Promise.resolve(false);
    }
  }
}
