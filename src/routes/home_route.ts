import { FastifyInstance } from 'fastify';
import * as homeController from 'controllers/home_controller';
import { baseControllerEntry } from 'controllers/base_controller';

export async function homeRoutes(fastify: FastifyInstance) {
  fastify.get('/', baseControllerEntry(homeController.index)); // Home page route
}

export async function healthcheckRoutes(fastify: FastifyInstance) {
  fastify.get('/healthcheck', baseControllerEntry(homeController.healthcheck)); // Home page route
}