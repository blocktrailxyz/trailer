import { FastifyReply, FastifyRequest } from 'fastify';
import { renderJson } from 'helpers/render_json_helper';
import BlockchainAuthenticator, { BlockchainAuthParams } from 'services/blockchain_authenticator';
import { UserSerializer } from 'serializers/user_serializer';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async() => {
    const authParams = request.body as BlockchainAuthParams;
    const { user } = await BlockchainAuthenticator.call(authParams);

    const responseData = UserSerializer.serialize(user);
    return reply.send(responseData);
  }, request, reply);
};
