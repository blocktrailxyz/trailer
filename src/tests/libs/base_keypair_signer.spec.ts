import { Wallet } from "ethers";
import BaseKeypairSigner from "libs/base_keypair_signer";

describe("BaseKeypairSigner", () => {
  const privateKey: string = "0x6f8824ee295c41da2c415278c426230ad153b09e17c3a5ee16b785edb8da6ed1";
  const walletAddress: string = new Wallet(privateKey).address;
  const message = "Test Message";

  describe("sign", () => {
    it('should sign a message and return a valid base64-encoded signature', async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);

      const expectedSignature = "0x4f8bb9be82d1fe58cfb24e1b1598589a3d2e9e0ba1f7b011302dc95e687b60045008c791657c8522d97a90bb0efb6e7f8831381fd699a4856f2093cc5efc0cdc1c"
      expect(signature).toBeDefined();
      expect(typeof signature).toBe("string");
      expect(signature).toEqual(expectedSignature)
    });
  });

  describe("verify", () => {
    it("should verify a valid signature", async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);
      const isValid = await BaseKeypairSigner.verify(message, signature, walletAddress);
      expect(isValid).toBe(true);
    });

    it("should return false for an invalid signature", async () => {
      const invalidSignature = "invalidsignature";

      const isValid = await BaseKeypairSigner.verify(message, invalidSignature, walletAddress);
      expect(isValid).toBe(false);
    });

    it("should return false for a mismatched message", async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);

      const isValid = await BaseKeypairSigner.verify("Different Message", signature, walletAddress);
      expect(isValid).toBe(false);
    });
  });
});
