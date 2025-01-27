import crypto from "crypto";
import BaseKeypairSigner from "libs/base_keypair_signer";

(async () => {
  // Generate a private/public key pair (for testing)
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const message = "Test Message";

  // Sign the message
  const signature = await BaseKeypairSigner.sign(privateKey, message);
  console.log("Signature:", signature);

  // Verify the signature
  const isValid = await BaseKeypairSigner.verify(publicKey, message, signature);
  console.log("Is Valid:", isValid);
})();
