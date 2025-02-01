import { FastifyReply, FastifyRequest } from "fastify";
import { render401Error } from "helpers/render_json_helper";
import UserAuthTokenSigner from "libs/user_auth_token_signer";
import User from "models/user";

export interface FastifyAuthRequest extends FastifyRequest {
  currentUser?: (User | null)
}

const authenticatorMiddleware = async(request: FastifyAuthRequest, reply: FastifyReply) => {
  // Check if the request has a valid token
  const authorizationHeader = request.headers['authorization'];
  request.currentUser = null;

  if (!authorizationHeader) {
    return render401Error(reply, 'Bearer token is required in the Authorization header');
  }

  const token = authorizationHeader.split(' ')[1];
  if(!token) {
    return render401Error(reply, 'Token must be in the format "Bearer <token>"');
  }

  const user: User | null = await UserAuthTokenSigner.verify(token)
  request.currentUser = user;

  if(!user) {
    return render401Error(reply, 'Unauthorized')
  }
}

export default authenticatorMiddleware;