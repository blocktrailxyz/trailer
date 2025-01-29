import { FastifyInstance } from 'fastify';
import * as homeController from 'controllers/home_controller';

export default async function homeRoutes(fastify: FastifyInstance) {
  fastify.get('/', homeController.index); // Home page route
}
