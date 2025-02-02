/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "errors/app_error";
import { FastifyReply, FastifyRequest } from "fastify";
import { renderError } from "helpers/render_json_helper";
import UserAuthTokenSigner from "libs/user_auth_token_signer";
import User from "models/user";

export interface FastifyAuthRequest extends FastifyRequest {
  currentUser?: (User | null)
}

const authenticatorMiddleware = async(request: FastifyAuthRequest, reply: FastifyReply) => {
  try {
    // Check if the request has a valid token
    const authorizationHeader = request.headers['authorization'];
    request.currentUser = null;

    if (!authorizationHeader) {
      // return render401Error(reply, 'Bearer token is required in the Authorization header');
      throw new AppError('Bearer token is required in the Authorization header', 401);
    }

    const token = authorizationHeader.split(' ')[1];
    if(!token) {
      // return render401Error(reply, 'Token must be in the format "Bearer <token>"');
      throw new AppError('Token must be in the format "Bearer <token>"', 401);
    }

    const user: User | null = await UserAuthTokenSigner.verify(token)
    request.currentUser = user;

    if(!user) {
      // return render401Error(reply, 'Unauthorized')
      throw new AppError('Unauthorized', 401);
    }
  }
  catch(error: any) {
    renderError(reply, error.statusCode, error);
  }
}

export default authenticatorMiddleware;