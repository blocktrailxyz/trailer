import BlockchainAuthenticator from 'services/blockchain_authenticator';
import BlockchainAuthToken, { JwtTokenPayload } from 'libs/blockchain_challenge';
import SuiKeypairSigner from 'libs/sui_keypair_signer';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import Authentication, { BlockchainProvider } from 'models/authentication';
import { authenticationWithUserFactory } from 'factories/authentication.factory';
import User from 'models/user';

describe('BlockchainAuthenticator', () => {
  const keypair = new Ed25519Keypair()
  const walletAddress = keypair.getPublicKey().toSuiAddress();
  const nonce = new Date().getTime();
  const message = `Please sign this message: {nonce=${nonce}}`;

  describe('verify signature', () => {
    it('should verify a valid token and signature', async () => {
      const authToken = BlockchainAuthToken.sign(message, walletAddress, BlockchainProvider.Sui);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      const result = await BlockchainAuthenticator.verify({
        walletAddress,
        signature,
        token: authToken
      }) as JwtTokenPayload;

      expect(result.chain).toEqual(BlockchainProvider.Sui);
      expect(result.message).toEqual(message);
      expect(result.walletAddress).toEqual(walletAddress);
    });

    it('should throw an error if wallet address does not match', async () => {
      const authToken = BlockchainAuthToken.sign(message, '0x456def', BlockchainProvider.Sui);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      await expect(
        BlockchainAuthenticator.verify({
          walletAddress,
          signature,
          token: authToken
        })
      ).rejects.toThrow(`Invalid wallet address 0x456def for ${walletAddress}`);
    });

    it('should throw an error if signature is invalid', async () => {
      const authToken = BlockchainAuthToken.sign(message, walletAddress, BlockchainProvider.Sui);

      await expect(
        BlockchainAuthenticator.verify({
          walletAddress,
          signature: 'invalid signature',
          token: authToken
        })
      ).rejects.toThrow(`Invalid signature`);
    });
  });

  describe('call', () => {
    it('should return an existing user and authentication if found', async () => {
      const authToken = BlockchainAuthToken.sign(message, walletAddress, BlockchainProvider.Sui);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      const { user, authentication } = await authenticationWithUserFactory.create(
                                        {},
                                        { provider: BlockchainProvider.Sui, providerId: walletAddress });

      const result = await BlockchainAuthenticator.call({
        token: authToken,
        signature,
        walletAddress,
      });

      expect(result.user.toJSON()).toEqual((user as User).toJSON())
      expect(result.authentication.get()).toEqual((authentication as Authentication).get())
      expect(result.isNewUser).toEqual(false)
    });

    it('should create a new user and authentication if not found', async () => {
      const authToken = BlockchainAuthToken.sign(message, walletAddress, BlockchainProvider.Sui);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      const result = await BlockchainAuthenticator.call({
        token: authToken,
        signature,
        walletAddress,
      });

      expect(result.user).toBeInstanceOf(User);
    });
  });
});
