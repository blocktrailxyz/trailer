import { AppError } from 'errors/app_error';
import { FastifyReply, FastifyRequest } from 'fastify';
import BlockchainChallenge, { BlockchainChallengePayload } from 'libs/blockchain_challenge';
import { BlockchainChallengeSerializer } from 'serializers/blockchain_challenge_serializer';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {

  const { walletAddress, chain } = request.body as BlockchainChallengePayload;

  if(walletAddress === undefined || chain === undefined){
    const errorMessage = 'Wallet Address and Chain are required'
    throw new AppError(errorMessage, 400);
  }
  const nonce = new Date().getTime();
  const message = `Please sign this message: nonce: {${nonce}}`;

  const token = BlockchainChallenge.sign(message, walletAddress, chain);
  const result = { id: nonce, token: token, message: message }
  const responseData = BlockchainChallengeSerializer.serialize(result);
  return reply.send(responseData);
};
