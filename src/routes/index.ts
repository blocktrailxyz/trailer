import { FastifyInstance } from 'fastify';
import homeRoutes from './home';

import userRoutes from './api/v1/users';
import oauthRoutes from './api/v1/oauth';
import challengeRoutes from './api/v1/challenge';
import signatureRoutes from './api/v1/signature';

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
