import bs58 from 'bs58';
import { Keypair } from "@solana/web3.js";
import SolanaKeypairSigner from "libs/solana_keypair_signer";
import Table from 'cli-table3';

(async () => {

  // Create a table
  const table = new Table({
    head: ['Name', 'Value' ], // Table headers
    colWidths: [null, null],  // Set column widths flexible
    wordWrap: false,          // Enable word wrapping
  });

  // publicKey = CGomr5mcTRF7kEGxwVw6aQsZQgG6F3yPSWE5WVoTUqRh
  const defaultSecretKey: string = "62GRgc3JQvUsCsZP1qYXQZZaBKk8DM3GQy1ykuppvaBrJ6hpfPaFqnkeY2rWWgfeXCwwgsqghBRnPw49kkGrzwrf"; // Leave empty to generate a new keypair
  const defaultChallengeMessage = `Please sign this message: nonce: {1738161180558}`; // Copy from server response to sign challenge

  let keypair: Keypair;
  let publicKey: string;
  let secretKey: string;
  let existingKey: boolean = true;

  table.push(['Default Private key', defaultSecretKey]);

  if( defaultSecretKey === '') {
    keypair = Keypair.generate();
    publicKey = keypair.publicKey.toBase58();
    secretKey = bs58.encode(keypair.secretKey);
    existingKey = false
  }
  else {
    secretKey = defaultSecretKey;
    keypair = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(defaultSecretKey)));
    publicKey = keypair.publicKey.toBase58();
    existingKey = true
  }

  table.push(['Existing Key', existingKey]);
  table.push(['Secret Key', secretKey]);
  table.push(['Wallet Address(Pub Key bs58)', publicKey]);

  // Sign the message
  const signature = await SolanaKeypairSigner.sign(keypair, defaultChallengeMessage);

  table.push(['Message', defaultChallengeMessage]);
  table.push(['Signature', signature]);

  // Verify the signature
  const isValid = await SolanaKeypairSigner.verify(
    defaultChallengeMessage,
    signature,
    publicKey
  );
  console.log("Is Valid:", isValid);
  table.push(['Is Valid', isValid]);
  console.log(table.toString());
})();
