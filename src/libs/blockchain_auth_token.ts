import { BlockchainProvider } from "models/authentication";
import jwt from "jsonwebtoken";
import { Env } from "libs/env";

export interface JwtTokenPayload {
  walletAddress: string;
  message: string;
  chain: string;
}

export default class BlockchainAuthToken {
  // send this to client to sign the message
  public static encode(walletAddress: string): string {
    const message = `Please sign this message: ${this.nonce()} with address: ${walletAddress}`;
    const payload: JwtTokenPayload = { walletAddress, message, chain: BlockchainProvider.Sui }

    const token = jwt.sign( payload, this.secret(), { expiresIn: '5m' }) // Token expires in 5 minutes
    return token;
  }

  public static async decode(token: string): Promise<JwtTokenPayload|undefined> {
    const decodedPayload = jwt.verify(token, this.secret()) as JwtTokenPayload
    return decodedPayload
  }

  static nonce(): number {
    return new Date().getTime();
  }

  static secret(): string {
    const secret = Env.fetch('JWT_SECRET') ;
    return secret
  }
}