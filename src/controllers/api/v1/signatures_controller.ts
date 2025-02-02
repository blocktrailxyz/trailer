import { FastifyReply, FastifyRequest } from 'fastify';
import UserAuthTokenSerializer from 'serializers/user_auth_token_serializer';
import BlockchainAuthenticator, { BlockchainAuthParams } from 'services/blockchain_authenticator';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const authParams = request.body as BlockchainAuthParams;
  const { user } = await BlockchainAuthenticator.call(authParams);

  const responseData = UserAuthTokenSerializer.serialize(user);
  return reply.send(responseData);
};
