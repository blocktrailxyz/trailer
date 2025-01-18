import { FastifyRequest, FastifyReply } from 'fastify';

export const index = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Welcome to the API!', documentation: '/api/docs' });
};
