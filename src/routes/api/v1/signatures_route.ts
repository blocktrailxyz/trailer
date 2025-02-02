import { FastifyInstance } from 'fastify';
import { create } from 'controllers/api/v1/signatures_controller';
import { baseControllerEntry } from 'controllers/base_controller';

export default async function signatureRoutes(fastify: FastifyInstance) {
  fastify.post('/', baseControllerEntry(create)); // POST /api/v1/challenges
}
