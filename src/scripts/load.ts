import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import SuiKeypairSigner from 'libs/sui_keypair_signer';

(async () => {
  const keypair = new Ed25519Keypair();
  const walletAddress = keypair.getPublicKey().toSuiAddress();
  const message = "Sign me to prove who you are!";
  const signature = await SuiKeypairSigner.sign(keypair, message);

  console.log(`Dapps address: ${walletAddress} signs the message: ${message} with the signature: ${signature}`);

  // with correct address
  const address = await SuiKeypairSigner.verify(message, signature, walletAddress)
  console.log(`address confirmed: ${address}`);

  // with incorrect address
  const keypairA = new Ed25519Keypair();
  const otherWalletAddress = keypairA.getPublicKey().toSuiAddress();
  try {
    await SuiKeypairSigner.verify(message, signature, otherWalletAddress)
  } catch(error) {
    console.log(`address: ${otherWalletAddress} failed: ${error}`);
  }
})();
