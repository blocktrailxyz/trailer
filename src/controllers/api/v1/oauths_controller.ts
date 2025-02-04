import { isBlank } from 'helpers/app_helper';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserSerializer } from 'serializers/user_serializer';
import OauthAuthenticator, { OAuthParams } from 'services/oauth_authenticator';
import { AppError } from 'errors/app_error';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {

  const { provider, token, displayName, emojicon } = request.body as OAuthParams;

  if (isBlank(provider) || isBlank(token)) {
    const errorMessage = 'Provider and token are required'
    throw new AppError(errorMessage, 400);
  }

  else {
    const result = await OauthAuthenticator.call({ provider, token, displayName, emojicon });
    const responseData = UserSerializer.serialize(result.user);

    return reply.send(responseData);
  }

};
