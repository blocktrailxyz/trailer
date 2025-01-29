import { FastifyReply, FastifyRequest } from 'fastify';
import { render400Error, renderJson } from 'utils/render_json';
import BlockchainChallenge, { BlockchainChallengePayload } from 'libs/blockchain_challenge';
import { BlockchainChallengeSerializer } from 'serializers/blockchain_challenge';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async() => {
    const { walletAddress, chain } = request.body as BlockchainChallengePayload;

    if(walletAddress === undefined || chain === undefined){
      const errorMessage = 'Wallet Address and Chain are required'
      return render400Error(request, reply, errorMessage);
    }
    const nonce = new Date().getTime();
    const message = `Please sign this message: nonce: {${nonce}}`;

    const token = BlockchainChallenge.sign(message, walletAddress, chain);
    const result = { id: nonce, token: token, message: message }
    const responseData = BlockchainChallengeSerializer.serialize(result);
    return reply.send(responseData);
  }, request, reply);
};
