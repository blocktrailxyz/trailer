import BlockchainAuthToken, { JwtTokenPayload} from 'libs/blockchain_auth_token';

import { Env } from 'libs/env';

describe(`BlockchainAuthToken`, () => {
  const walletAddress = '0x34e3f76bf8c31e4d7c45442323b39a310a29624b25020ef3233b02c43d9c3389';
  const message = `Please sign this message: {nonce: ${new Date().getTime()}}`;

  describe('sign', () => {
    it('should generate a valid JWT token for the wallet address', () => {
      const token = BlockchainAuthToken.sign(message, walletAddress);
      expect(token).toBeTruthy();
    });
  });

  describe('verify', () => {
    it('should successfully verify a valid token and signature', async () => {
      const token = BlockchainAuthToken.sign(message, walletAddress);
      const result = await BlockchainAuthToken.verify(token) as JwtTokenPayload;

      expect(result.walletAddress).toBe(walletAddress);
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
