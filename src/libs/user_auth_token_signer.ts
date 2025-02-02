import User from "models/user";
import jwt from "jsonwebtoken";
import { Env } from "libs/env";

interface IUserAuthTokenSigner {
  id: string;
  displayName: string;
  authTokenVersion: number;
}

export default class UserAuthTokenSigner {
  public static sign(user: User, expiresIn: number = 24 * 3600): string {
    const payload: IUserAuthTokenSigner = { id: user.id, displayName: user.displayName, authTokenVersion: user.authTokenVersion }
    const signature = jwt.sign(
      payload,
      Env.fetch("JWT_SECRET"),
      { expiresIn: expiresIn }
    );

    return signature
  }

  public static async verify(token: string): Promise<User|null> {
    try {
      const payload = jwt.verify(token, Env.fetch("JWT_SECRET")) as IUserAuthTokenSigner;
      const user = await User.findOne({ where: { id: payload.id } });

      if(!user || user.authTokenVersion !== payload.authTokenVersion){
        return null;
      }
      return user;
    }
    catch {
      return null
    }

  }
}