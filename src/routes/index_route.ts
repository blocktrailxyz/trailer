import { FastifyInstance } from 'fastify';
import homeRoutes from './home_route';

import userRoutes from './api/v1/users_route';
import oauthRoutes from './api/v1/oauths_route';
import challengeRoutes from './api/v1/challenges_route';
import signatureRoutes from './api/v1/signatures_route';

export default async function routes(fastify: FastifyInstance) {
  // Home page route
  fastify.register(homeRoutes);

  // API with custom path
  fastify.register(
    async (apiV1) => {
      apiV1.register(userRoutes, { prefix: '/users' }); // Register /api/v1/users routes
      apiV1.register(oauthRoutes, { prefix: '/oauths' }); // Register /api/v1/users routes
      apiV1.register(challengeRoutes, { prefix: '/challenges' }); // Register /api/v1/users routes
      apiV1.register(signatureRoutes, { prefix: '/signatures' }); // Register /api/v1/users routes
    }, { prefix: '/api/v1' }); // All routes under /api namespace
}
