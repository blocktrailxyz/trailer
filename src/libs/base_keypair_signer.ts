import crypto from "crypto";

/**
 * Class for handling Base-specific signing and verification
 */
class BaseKeypairSigner {
  private static readonly algorithm = "sha256";

  /**
   * Signs a message using a private key.
   * @param privateKey The private key used for signing (in PEM format).
   * @param message The message to sign.
   * @returns The base64-encoded signature.
   */
  public static async sign(privateKey: string, message: string): Promise<string> {
    const sign = crypto.createSign(this.algorithm);
    sign.update(message);
    sign.end();

    const signature = sign.sign(privateKey);
    return signature.toString("base64");
  }

  /**
   * Verifies a message and signature using a public key.
   * @param publicKey The public key used for verification (in PEM format).
   * @param message The original message.
   * @param signature The base64-encoded signature to verify.
   * @returns A boolean indicating whether the signature is valid.
   */
  public static async verify(
    publicKey: string,
    message: string,
    signature: string
  ): Promise<boolean> {
    const verify = crypto.createVerify(this.algorithm);
    verify.update(message);
    verify.end();

    return verify.verify(publicKey, Buffer.from(signature, "base64"));
  }
}

export default BaseKeypairSigner;
