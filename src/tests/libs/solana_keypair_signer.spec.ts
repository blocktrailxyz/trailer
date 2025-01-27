import { Keypair } from "@solana/web3.js";
import SolanaKeypairSigner from "libs/solana_keypair_signer";

describe("SolanaKeypairSigner", () => {
  const message = "Test Message";
  let keypair: Keypair;

  beforeAll(() => {
    // Generate a real Solana Keypair
    keypair = Keypair.generate();
  });

  describe("sign", () => {
    it("should sign a message and return a valid base58-encoded signature", async () => {
      const signature = await SolanaKeypairSigner.sign(keypair, message);

      expect(signature).toBeDefined();
      expect(typeof signature).toBe("string");
    });
  });

  describe("verify", () => {
    it("should verify a valid signature", async () => {
      const signature = await SolanaKeypairSigner.sign(keypair, message);

      const isValid = await SolanaKeypairSigner.verify(
        message,
        signature,
        keypair.publicKey.toBase58()
      );

      expect(isValid).toBe(true);
    });

    it("should return false for an invalid signature", async () => {
      const invalidSignature = "invalidsignature123";

      const isValid = await SolanaKeypairSigner.verify(
        message,
        invalidSignature,
        keypair.publicKey.toBase58()
      );

      expect(isValid).toBe(false);
    });

    it("should return false for a mismatched public key", async () => {
      const signature = await SolanaKeypairSigner.sign(keypair, message);

      // Generate a new keypair to use as a mismatched public key
      const mismatchedKeypair = Keypair.generate();

      const isValid = await SolanaKeypairSigner.verify(
        message,
        signature,
        mismatchedKeypair.publicKey.toBase58()
      );

      expect(isValid).toBe(false);
    });

    it("should return false for a mismatched message", async () => {
      const signature = await SolanaKeypairSigner.sign(keypair, message);

      const isValid = await SolanaKeypairSigner.verify(
        "Different Message",
        signature,
        keypair.publicKey.toBase58()
      );

      expect(isValid).toBe(false);
    });
  });
});
