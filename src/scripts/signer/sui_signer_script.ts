
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import SuiKeypairSigner from 'libs/sui_keypair_signer';
import Table from 'cli-table3';

// Create a table
const table = new Table({
  head: ['Name', 'Value' ], // Table headers
  colWidths: [null, null],  // Set column widths flexible
  wordWrap: false,          // Enable word wrapping
});

(async () => {
  const suiSecretKey = ''; // Leave empty to generate a new keypair
  const suiChallengeMessage = ''; // Copy from server response to sign challenge

  let keypair: Ed25519Keypair;
  let walletAddress: string;
  let secretKey: string;
  let existingKey: boolean = true;

  secretKey = suiSecretKey;
  table.push(['Private key', secretKey]);

  if( secretKey === '') {
    keypair = new Ed25519Keypair();
    walletAddress = keypair.getPublicKey().toSuiAddress();
    secretKey = keypair.getSecretKey();
    existingKey = false
  }
  else {
    keypair = Ed25519Keypair.fromSecretKey(secretKey);
    walletAddress = keypair.getPublicKey().toSuiAddress();
    existingKey = true
  }

  table.push(['Existing Key', existingKey]);
  table.push(['Secret Key', secretKey]);
  table.push(['Wallet Address', walletAddress]);

  const message = suiChallengeMessage;
  const signature = await SuiKeypairSigner.sign(keypair, message);

  table.push(['Message', message]);
  table.push(['Signature', signature]);

  // with correct address
  let verified = await SuiKeypairSigner.verify(message, signature, walletAddress)

  table.push(['Address Verification', verified]);

  // with incorrect address
  const keypairA = new Ed25519Keypair();
  const otherWalletAddress = keypairA.getPublicKey().toSuiAddress();
  verified = await SuiKeypairSigner.verify(message, signature, otherWalletAddress)
  console.log('verified: ', verified);

  console.log(table.toString());
})();
