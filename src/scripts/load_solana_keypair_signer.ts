
import { Keypair } from "@solana/web3.js";
import SolanaKeypairSigner from "libs/solana_keypair_signer";

(async () => {
  const keypair = Keypair.generate();
  const message = "Test Message";

  // Sign the message
  const signature = await SolanaKeypairSigner.sign(keypair, message);
  console.log("Signature:", signature);

  // Verify the signature
  const isValid = await SolanaKeypairSigner.verify(
    message,
    signature,
    keypair.publicKey.toBase58()
  );
  console.log("Is Valid:", isValid);
})();
