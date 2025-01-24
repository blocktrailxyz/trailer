import BlockchainAuthenticator from 'services/blockchain_authenticator';
import BlockchainAuthToken, { JwtTokenPayload } from 'libs/blockchain_auth_token';
import SuiKeypairSigner from 'libs/sui_keypair_signer';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { BlockchainProvider } from 'models/authentication';
import { authenticationWithUserFactory } from 'factories/authentication.factory';
import User from 'models/user';

describe('BlockchainAuthenticator', () => {
  const keypair = new Ed25519Keypair()
  const walletAddress = keypair.getPublicKey().toSuiAddress();
  const message = 'Please sign this message 2_000_999_777';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('verify', () => {
    it('should verify a valid token and signature', async () => {
      const authToken = BlockchainAuthToken.encode(walletAddress);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      // console.log(`walletAddress: ${walletAddress}, signature: ${signature}, token: ${authToken}`);

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
      const authToken = BlockchainAuthToken.encode('0x456def');
      const signature = await SuiKeypairSigner.sign(keypair, message);

      await expect(
        await BlockchainAuthenticator.verify({
          walletAddress,
          signature,
          token: authToken
        })
      ).rejects.toThrow(`Invalid wallet address 0x456def for ${walletAddress}`);
    });

    it('should throw an error if signature is invalid', async () => {
      const authToken = BlockchainAuthToken.encode(walletAddress);

      await expect(
        await BlockchainAuthenticator.verify({
          walletAddress,
          signature: 'invalid signature',
          token: authToken
        })
      ).rejects.toThrow(`Invalid wallet address 0x456def for ${walletAddress}`);
    });
  });

  describe('call', () => {
    it('should return an existing user and authentication if found', async () => {
      const authToken = BlockchainAuthToken.encode(walletAddress);
      const signature = await SuiKeypairSigner.sign(keypair, message);

      const { user, authentication } = await authenticationWithUserFactory.create(
                                        {},
                                        { provider: BlockchainProvider.Sui, providerId: walletAddress });

      const result = await BlockchainAuthenticator.call({
        token: authToken,
        signature,
        walletAddress,
      });

      expect(result).toEqual({
        user,
        authentication,
        isNewUser: false,
      });
    });

    it('should create a new user and authentication if not found', async () => {
      const authToken = BlockchainAuthToken.encode(walletAddress);
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
