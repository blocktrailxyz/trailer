import crypto from "crypto";
import BaseKeypairSigner from "libs/base_keypair_signer";

describe("BaseKeypairSigner", () => {
  let privateKey: string;
  let publicKey: string;
  const message = "Test Message";

  beforeAll(() => {
    // Generate a key pair
    const keys = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    privateKey = keys.privateKey;
    publicKey = keys.publicKey;
  });

  describe("sign", () => {
    it("should sign a message and return a valid base64-encoded signature", async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);

      expect(signature).toBeDefined();
      expect(typeof signature).toBe("string");
      expect(Buffer.from(signature, "base64").length).toBeGreaterThan(0);
    });
  });

  describe("verify", () => {
    it("should verify a valid signature", async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);

      const isValid = await BaseKeypairSigner.verify(publicKey, message, signature);
      expect(isValid).toBe(true);
    });

    it("should return false for an invalid signature", async () => {
      const invalidSignature = "invalidsignature";

      const isValid = await BaseKeypairSigner.verify(publicKey, message, invalidSignature);
      expect(isValid).toBe(false);
    });

    it("should return false for a mismatched message", async () => {
      const signature = await BaseKeypairSigner.sign(privateKey, message);

      const isValid = await BaseKeypairSigner.verify(publicKey, "Different Message", signature);
      expect(isValid).toBe(false);
    });
  });
});
