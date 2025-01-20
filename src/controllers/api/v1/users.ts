import { FastifyReply, FastifyRequest } from 'fastify';
import User from 'models/user';
import { IUserSerializer, UserSerializer } from 'serializers/user';
import { JsonApiResponse } from 'types/json_api_response';
import { paginate, parsePagination } from 'utils/paginate';
import { renderJson } from 'utils/render_json';

export const index = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async () => {
    const { page, perPage } = parsePagination(request.query);

    const paginatedUsers = await paginate(
      User,
      { order: [['createdAt', 'DESC']] },
      UserSerializer,
      page,
      perPage,
      request
    );

    reply.send(paginatedUsers);
  }, request, reply);

};

export const show = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {

    const user = await User.findByPk(request.params.id);
    if (user) {
      const responseData = UserSerializer.serialize(user);
      reply.send(responseData);
    } else {
      reply.status(404).send({ error: 'User not found' });
    }
  }, request, reply);
};

export const create = async (request: FastifyRequest<{ Body: { name: string; email: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {

    const { name, email } = request.body;
    const user = await User.create({ name, email });
    const responseData: JsonApiResponse<IUserSerializer> = UserSerializer.serialize(user);

    reply.status(201).send(responseData);
  }, request, reply);

};

export const update = async (request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {
    const { id } = request.params;
    const { name, email } = request.body;

    const user = await User.findByPk(id);
    if (user) {
      await user.update({ name, email });
      const resonseData: JsonApiResponse<IUserSerializer> = UserSerializer.serialize(user);
      reply.send(resonseData);
    } else {
      reply.status(404).send({ error: 'User not found' });
    }
  }, request, reply);

};

export const destroy = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {

    const { id } = request.params;

    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      reply.status(204).send();
    } else {
      reply.status(404).send({ error: 'User not found' });
    }
  }, request, reply);

};
