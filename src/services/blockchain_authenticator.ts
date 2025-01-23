// import crypto from 'crypto';
// import Authentication, { Provider } from 'models/authentication'; // Adjust path to your models
// import User from 'models/user'; // Adjust path to your models

// interface BlockchainAuthParams {
//   walletAddress: string;
//   signature: string;
//   challenge: string;
//   blockchain: Provider; // Enum for blockchain (e.g., SUI, Solana, Base)
// }

// interface AuthResult {
//   user: User;
//   isNewUser: boolean;
// }

// class BlockchainAuthenticateInteractor {
//   private static challenges: Map<string, string> = new Map(); // Temporary storage for challenges

//   static async generateChallenge(walletAddress: string): Promise<string> {
//     const challenge = crypto.randomBytes(32).toString('hex');
//     this.challenges.set(walletAddress, challenge);
//     return challenge;
//   }

//   static async call(params: BlockchainAuthParams): Promise<AuthResult> {
//     const { walletAddress, signature, challenge, blockchain } = params;

//     // Verify the challenge
//     const expectedChallenge = this.challenges.get(walletAddress);
//     if (!expectedChallenge || expectedChallenge !== challenge) {
//       throw new Error('Invalid or expired challenge');
//     }

//     // Verify the signature
//     const isSignatureValid = await this.verifySignature(walletAddress, signature, challenge, blockchain);
//     if (!isSignatureValid) {
//       throw new Error('Invalid signature');
//     }

//     // Clear the challenge after successful verification
//     this.challenges.delete(walletAddress);

//     // Check if the user already exists
//     const existingAuth = await Authentication.findOne({ where: { provider: blockchain, providerId: walletAddress } });
//     if (existingAuth) {
//       const user = await User.findByPk(existingAuth.userId);
//       if (!user) {
//         throw new Error('Associated user not found');
//       }
//       return { user, isNewUser: false };
//     }

//     // Create a new user and link the blockchain wallet
//     const user = await User.create({ displayName: `Wallet User ${walletAddress.slice(0, 6)}` });
//     await Authentication.create({ userId: user.id, provider: blockchain, providerId: walletAddress });

//     return { user, isNewUser: true };
//   }

//   private static async verifySignature(
//     walletAddress: string,
//     signature: string,
//     challenge: string,
//     blockchain: Provider
//   ): Promise<boolean> {
//     // Add blockchain-specific verification logic here
//     switch (blockchain) {
//       case Provider.SUI:
//         return this.verifySuiSignature(walletAddress, signature, challenge);
//       case Provider.Solana:
//         return this.verifySolanaSignature(walletAddress, signature, challenge);
//       case Provider.Base:
//         return this.verifyBaseSignature(walletAddress, signature, challenge);
//       default:
//         throw new Error(`Unsupported blockchain: ${blockchain}`);
//     }
//   }

//   private static async verifySuiSignature(walletAddress: string, signature: string, challenge: string): Promise<boolean> {
//     // Implement SUI-specific signature verification
//     return true; // Placeholder
//   }

//   private static async verifySolanaSignature(walletAddress: string, signature: string, challenge: string): Promise<boolean> {
//     // Implement Solana-specific signature verification
//     return true; // Placeholder
//   }

//   private static async verifyBaseSignature(walletAddress: string, signature: string, challenge: string): Promise<boolean> {
//     // Implement Base-specific signature verification
//     return true; // Placeholder
//   }
// }

// export default BlockchainAuthenticateInteractor;
