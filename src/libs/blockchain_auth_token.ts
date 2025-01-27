import { BlockchainProvider } from "models/authentication";
import jwt from "jsonwebtoken";
import { Env } from "libs/env";

export interface JwtTokenPayload {
  walletAddress: string;
  message: string;
  chain: string;
}

export default class BlockchainAuthToken {

  private static messageNonce: number = 0;

  // send this to client to sign the message
  public static sign(message: string, walletAddress: string): string {
    // const message = `Please sign this message: ${this.nonce()} with address: ${walletAddress}`;
    const payload: JwtTokenPayload = { walletAddress, message, chain: BlockchainProvider.Sui }

    const token = jwt.sign( payload, this.secret(), { expiresIn: '5m' }) // Token expires in 5 minutes
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