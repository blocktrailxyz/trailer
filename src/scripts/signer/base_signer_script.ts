import { Wallet } from "ethers";
import BaseKeypairSigner from "libs/base_keypair_signer";
import Table from 'cli-table3';

(async () => {

  // Create a table
  const table = new Table({
    head: ['Name', 'Value' ], // Table headers
    colWidths: [null, null],  // Set column widths flexible
    wordWrap: false,          // Enable word wrapping
  });

  // walletAddress = 0xA756a467625b643d5476Fbef003e1561aeCa9476
  const defaultSecretKey: string = "0x6f8824ee295c41da2c415278c426230ad153b09e17c3a5ee16b785edb8da6ed1"; // Leave empty to generate a new keypair
  const defaultChallengeMessage = `Please sign this message: nonce: {1738503797465}`; // Copy from server response to sign challenge

  let walletAddress: string;
  let secretKey: string;
  let existingKey: boolean = true;

  table.push(['Default Private key', defaultSecretKey]);

  if( defaultSecretKey === '') {
    const wallet = Wallet.createRandom();
    secretKey = wallet.privateKey;
    walletAddress = wallet.address;
  }
  else {
    secretKey = defaultSecretKey;
    const wallet = new Wallet(secretKey);
    walletAddress = wallet.address;
    existingKey = false;
  }

  table.push(['Existing Key', existingKey]);
  table.push(['Secret Key', secretKey]);
  table.push(['Wallet Address', walletAddress]);


  // Sign the message
  const signature = await BaseKeypairSigner.sign(secretKey, defaultChallengeMessage);
  table.push(['Message', defaultChallengeMessage]);
  table.push(['Signature', signature]);

  // Verify the signature
  const isValid = await BaseKeypairSigner.verify(defaultChallengeMessage, signature, walletAddress);
  console.log("Is Valid:", isValid);

  table.push(['Is Valid', isValid]);
  console.log(table.toString());
})();
