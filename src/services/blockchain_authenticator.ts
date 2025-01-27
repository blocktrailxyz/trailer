import BaseKeypairSigner from 'libs/base_keypair_signer';
import BlockchainAuthToken, { JwtTokenPayload } from 'libs/blockchain_auth_token';
import SolanaKeypairSigner from 'libs/solana_keypair_signer';
import SuiKeypairSigner from 'libs/sui_keypair_signer';
import Authentication, { BlockchainProvider } from 'models/authentication';
import User from 'models/user';

export interface AuthResult {
  user: User;
  authentication: Authentication;
  isNewUser: boolean;
}

export interface BlockchainAuthParams {
  token: string;
  signature: string;
  walletAddress: string;
}

class BlockchainAuthenticator {
  static async call(params: BlockchainAuthParams): Promise<AuthResult>{
    const {walletAddress, chain} = await this.verify(params) as JwtTokenPayload;

    // Check if the user already exists
    const existingAuth = await Authentication.findOne({ where: { provider: chain, providerId: walletAddress } });
    if (existingAuth) {
      const user = await User.findByPk(existingAuth.userId);
      if (!user) {
        throw new Error('Associated user not found');
      }
      return { user, authentication: existingAuth, isNewUser: false };
    }

    // Create a new user and link the blockchain wallet
    const displayName = `Wallet User ${walletAddress.slice(0, 6)}`;
    const emojicon = `:-)`;

    const user = await User.create({ displayName: displayName, emojicon: emojicon });
    const authentication = await Authentication.create({ userId: user.id, provider: chain, providerId: walletAddress });

    return { user, authentication, isNewUser: true };
  }

  public static async verify(params: BlockchainAuthParams): Promise<JwtTokenPayload|undefined> {
    const { walletAddress, signature, token } = params;
    const decodedPayload = await BlockchainAuthToken.verify(token) as JwtTokenPayload
    if(decodedPayload.walletAddress !== walletAddress){
      throw new Error(`Invalid wallet address ${decodedPayload.walletAddress} for ${walletAddress}`);
    }

    if(decodedPayload.chain == BlockchainProvider.Sui && await SuiKeypairSigner.verify(decodedPayload.message, signature, walletAddress)) {
      return decodedPayload;
    }
    else if(decodedPayload.chain == BlockchainProvider.Sol && await SolanaKeypairSigner.verify(decodedPayload.message, signature, walletAddress)) {
      return decodedPayload;
    }
    else if(decodedPayload.chain == BlockchainProvider.Base && await BaseKeypairSigner.verify(decodedPayload.message, signature, walletAddress)) {
      return decodedPayload;
    }

    throw new Error('Invalid signature');
  }
}

export default BlockchainAuthenticator;
