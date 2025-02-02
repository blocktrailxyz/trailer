import { AppError } from 'errors/app_error';
import { FastifyRequest, FastifyReply } from 'fastify';

export const index = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Welcome to the API!', status: 'ok' });
};

export const healthcheck = async () => {
  throw new AppError('Page not found', 404);
};
