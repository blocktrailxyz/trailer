import { FastifyInstance } from 'fastify';
import { create } from 'controllers/api/v1/signatures';

export default async function signatureRoutes(fastify: FastifyInstance) {
  fastify.post('/', create); // POST /api/v1/challenges
}
