import BlockchainAuthToken, { JwtTokenPayload} from 'libs/blockchain_auth_token';
// import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

import { Env } from 'libs/env';

describe(`BlockchainAuthToken`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // const keypair = new Ed25519Keypair();
  // const walletAddress = keypair.getPublicKey().toSuiAddress();
  const walletAddress = '0x34e3f76bf8c31e4d7c45442323b39a310a29624b25020ef3233b02c43d9c3389';

  describe('sign', () => {
    it('should generate a valid JWT token for the wallet address', () => {
      const token = BlockchainAuthToken.encode(walletAddress);
      expect(token).toBeTruthy();
    });
  });

  describe('verify', () => {
    it('should successfully verify a valid token and signature', async () => {
      const token = BlockchainAuthToken.encode(walletAddress);
      const result = await BlockchainAuthToken.decode(token) as JwtTokenPayload;

      expect(result.walletAddress).toBe(walletAddress);
    });
  });

  describe('nonce', () => {
    it('should fetch the JWT nonce from the environment', () => {
      const nonce = 1633024800000
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(nonce);

      const testNonce = BlockchainAuthToken.nonce()
      expect(testNonce).toBe(nonce);
    });
  });
  describe('secret', () => {
    it('should fetch the JWT secret from the environment', () => {
      const secret = BlockchainAuthToken.secret();
      const testSecret = Env.fetch('JWT_SECRET')
      expect(secret).toBe(testSecret);
    });
  });
});
