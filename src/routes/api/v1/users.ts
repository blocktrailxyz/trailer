import { FastifyInstance } from 'fastify';
import * as usersController from 'controllers/api/v1/users';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', usersController.index); // GET /api/users
  fastify.get('/:id', usersController.show); // GET /api/users/:id
  fastify.post('/', usersController.create); // POST /api/users
  fastify.put('/:id', usersController.update); // PUT /api/users/:id
  fastify.delete('/:id', usersController.destroy); // DELETE /api/users/:id
}
