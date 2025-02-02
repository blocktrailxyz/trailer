import { FastifyInstance } from 'fastify';
import * as usersController from 'controllers/api/v1/users_controller';
import { ParamIdType } from 'types/param_id_type';
import { baseControllerEntry } from 'controllers/base_controller';

export default async function userRoutes(fastify: FastifyInstance) {

  // users controller
  fastify.get('/', baseControllerEntry(usersController.index)); // GET /api/users
  fastify.get<{Params: ParamIdType}>( '/:id', baseControllerEntry(usersController.show)); // GET /api/users/:id
  fastify.post('/', baseControllerEntry(usersController.create)); // POST /api/users
  fastify.put('/:id', baseControllerEntry(usersController.update)); // PUT /api/users/:id
  fastify.delete<{Params: ParamIdType}>( '/:id', baseControllerEntry(usersController.destroy)); // DELETE /api/users/:id
}
