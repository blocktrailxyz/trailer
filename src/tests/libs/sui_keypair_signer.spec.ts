import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import SuiKeypairSigner from "libs/sui_keypair_signer";

describe('SuiKeypairSigner', () => {
  const keypair = new Ed25519Keypair();
  const walletAddress = keypair.getPublicKey().toSuiAddress();
  const message = 'Sign me to prove who you are!';

  describe('.sign', () => {
    it('should sign a message using a keypair', async () => {
      const signature = await SuiKeypairSigner.sign(keypair, message);
      expect(signature).toBeTruthy();
    })
  })

  describe('.verify', () => {
    it('should verify a signed message', async () => {
      const signature = await SuiKeypairSigner.sign(keypair, message);
      const address = await SuiKeypairSigner.verify(message, signature, walletAddress);
      expect(address).toEqual(true);
    })

    it('should throw an error if the address does not match', async () => {
      const signature = await SuiKeypairSigner.sign(keypair, message);
      const wrongAddress = '0xffffffffff';

      const result = await SuiKeypairSigner.verify( message, signature, wrongAddress)
      expect(result).toBe(false)
    })
  })
})
