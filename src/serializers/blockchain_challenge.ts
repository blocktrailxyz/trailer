import { Serializer } from "jsonapi-serializer";

export const BlockchainChallengeSerializer = new Serializer(
  'blockchain_challenges',
  {
    attributes: ['token', 'message'],
    keyForAttribute: 'camelCase'
  }
)