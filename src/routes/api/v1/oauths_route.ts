import { FastifyInstance } from 'fastify';
import { create } from 'controllers/api/v1/oauths_controller';

export default async function oauthRoutes(fastify: FastifyInstance) {
  fastify.post('/', create); // POST /api/v1/oauths
}
