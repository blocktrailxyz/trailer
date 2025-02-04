
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import SuiKeypairSigner from 'libs/sui_keypair_signer';
import Table from 'cli-table3';

(async () => {
  // Create a table
  const table = new Table({
    head: ['Name', 'Value' ], // Table headers
    colWidths: [null, null],  // Set column widths flexible
    wordWrap: false,          // Enable word wrapping
  });

  // walletAddress = 0xa47bd8fbd3f387a521f9f948aba600786757a2cc6b0f08e6f944f49ee13f7c14
  const defaultSecretKey = 'suiprivkey1qrnmcwwfr2whakmgf85fmqw3ahkteq6d9z9u3nr959kdj8fk3sq3cmfwt9k'; // Leave empty to generate a new keypair
  const defaultChallengeMessage = 'Please sign this message: nonce: {1738504521705}'; // Copy from server response to sign challenge

  let keypair: Ed25519Keypair;
  let walletAddress: string;
  let secretKey: string;
  let existingKey: boolean = true;

  secretKey = defaultSecretKey;
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

  const message = defaultChallengeMessage;
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
