import BlockchainChallenge, { JwtTokenPayload} from 'libs/blockchain_challenge';

import { Env } from 'libs/env';
import { BlockchainProvider } from 'models/authentication';

describe(`BlockchainChallenge`, () => {
  const walletAddress = '0x34e3f76bf8c31e4d7c45442323b39a310a29624b25020ef3233b02c43d9c3389';
  const message = `Please sign this message: {nonce: ${new Date().getTime()}}`;

  describe('sign', () => {
    it('should generate a valid JWT token for the wallet address', () => {
      const token = BlockchainChallenge.sign(message, walletAddress, BlockchainProvider.Sui);
      expect(token).toBeTruthy();
    });
  });

  describe('verify', () => {
    it('should successfully verify a valid token and signature', async () => {
      const token = BlockchainChallenge.sign(message, walletAddress, BlockchainProvider.Sui);
      const result = await BlockchainChallenge.verify(token) as JwtTokenPayload;

      expect(result.walletAddress).toBe(walletAddress);
    });
  });

  describe('secret', () => {
    it('should fetch the JWT secret from the environment', () => {
      const secret = BlockchainChallenge.secret();
      const testSecret = Env.fetch('JWT_SECRET')
      expect(secret).toBe(testSecret);
    });
  });
});
