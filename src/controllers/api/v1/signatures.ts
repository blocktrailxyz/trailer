import { FastifyReply, FastifyRequest } from 'fastify';
import { renderJson } from 'utils/render_json';
import BlockchainAuthenticator, { BlockchainAuthParams } from 'services/blockchain_authenticator';
import { UserSerializer } from 'serializers/user';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async() => {
    const authParams = request.body as BlockchainAuthParams;
    const { user } = await BlockchainAuthenticator.call(authParams);

    const responseData = UserSerializer.serialize(user);
    return reply.send(responseData);
  }, request, reply);
};
