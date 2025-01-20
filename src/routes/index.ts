import { FastifyInstance } from 'fastify';
import userRoutes from './api/v1/users';
import homeRoutes from './home';

export default async function routes(fastify: FastifyInstance) {
  // Home page route
  fastify.register(homeRoutes);

  // API with custom path
  fastify.register(async (api) => {
    api.register(userRoutes, { prefix: '/users' }); // Register /api/v1/users routes
  }, { prefix: '/api/v1' }); // All routes under /api namespace
}
