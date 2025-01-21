import { FastifyInstance } from 'fastify';
import * as usersController from 'controllers/api/v1/users';
import { ParamIdType } from 'types/param_id_type';

export default async function userRoutes(fastify: FastifyInstance) {

  // users controller
  fastify.get('/', usersController.index); // GET /api/users
  fastify.get<{Params: ParamIdType}>('/:id', usersController.show); // GET /api/users/:id
  fastify.post('/', usersController.create); // POST /api/users
  fastify.put('/:id', usersController.update); // PUT /api/users/:id
  fastify.delete<{Params: ParamIdType}>('/:id', usersController.destroy); // DELETE /api/users/:id
}
