import { BlockchainProvider } from "models/authentication";
import jwt from "jsonwebtoken";
import { Env } from "libs/env";

export interface BlockchainChallengePayload {
  walletAddress: string;
  chain: BlockchainProvider;
}

export interface JwtTokenPayload {
  walletAddress: string;
  message: string;
  chain: BlockchainProvider;
}

export default class BlockchainChallenge {

  private static messageNonce: number = 0;

  // send this to client to sign the message
  public static sign(message: string, walletAddress: string, chain: BlockchainProvider): string {
    const payload: JwtTokenPayload = { walletAddress, message, chain: chain }
    const expiresIn = parseInt(Env.fetch('CHALLENGE_MAX_TTL', '3600')) // 5 minutes
    const token = jwt.sign( payload, this.secret(), { expiresIn: expiresIn }) // Token expires in 5 minutes
    return token ;
  }

  public static async verify(token: string): Promise<JwtTokenPayload|undefined> {
    try {
      const decodedPayload = jwt.verify(token, this.secret()) as JwtTokenPayload
      return decodedPayload
    }
    catch(error) {
      throw new Error(`Invalid token: ${error}`)
    }
  }

  static secret(): string {
    const secret = Env.fetch('JWT_SECRET') ;
    return secret
  }
}