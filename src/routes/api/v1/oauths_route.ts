import { FastifyInstance } from 'fastify';
import { create } from 'controllers/api/v1/oauths_controller';
import { baseControllerEntry } from 'controllers/base_controller';

export default async function oauthRoutes(fastify: FastifyInstance) {
  fastify.post('/', baseControllerEntry(create)); // POST /api/v1/oauths
}
