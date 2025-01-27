import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

/**
 * Class for handling Solana-specific signing and verification
 */
class SolanaKeypairSigner {
  /**
   * Signs a message using a Solana Keypair.
   * @param keypair The Solana Keypair used for signing.
   * @param message The message to sign.
   * @returns The base58-encoded signature.
   */
  public static async sign(keypair: Keypair, message: string): Promise<string> {
    const messageBytes = SolanaKeypairSigner.encodeMessage(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return SolanaKeypairSigner.encodeBase58(signature);
  }

  /**
   * Verifies a signed message using a Solana public key.
   * @param message The original message.
   * @param signature The base58-encoded signature.
   * @param publicKey The base58-encoded public key.
   * @returns A Promise resolving to a boolean indicating whether the verification succeeded.
   */
  public static async verify(
    message: string,
    signature: string,
    publicKey: string
  ): Promise<boolean> {
    try {
      const messageBytes = SolanaKeypairSigner.encodeMessage(message);
      const signatureBytes = SolanaKeypairSigner.decodeBase58(signature);
      const publicKeyBytes = SolanaKeypairSigner.decodeBase58(publicKey);

      const isVerified = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
      return isVerified;
    }
    catch {
      return false;
    }
  }

  /**
   * Encodes a message to a Uint8Array using UTF-8.
   * @param message The message to encode.
   * @returns The encoded message as a Uint8Array.
   */
  private static encodeMessage(message: string): Uint8Array {
    return new TextEncoder().encode(message);
  }

  /**
   * Encodes a Uint8Array to a base58 string.
   * @param bytes The bytes to encode.
   * @returns The base58-encoded string.
   */
  private static encodeBase58(bytes: Uint8Array): string {
    return bs58.encode(Buffer.from(bytes));
  }

  /**
   * Decodes a base58 string to a Uint8Array.
   * @param base58String The base58 string to decode.
   * @returns The decoded Uint8Array.
   */
  private static decodeBase58(base58String: string): Uint8Array {
    return bs58.decode(base58String);
  }
}

export default SolanaKeypairSigner;
