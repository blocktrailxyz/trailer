import { FastifyReply, FastifyRequest } from 'fastify';
import User from 'models/user';
import { IUserSerializer, UserSerializer } from 'serializers/user_serializer';
import { JsonApiResponseType } from 'types/json_api_response_type';
import { paginate, parsePagination } from 'helpers/paginate_helper';
import { render404Error, renderJson } from 'helpers/render_json_helper';

export const index = async (request: FastifyRequest, reply: FastifyReply) => {
  await renderJson(async () => {
    const paginateParams = parsePagination(request.query);
    const paginatedUsers = await paginate(
      User,
      { order: [['createdAt', 'DESC']] },
      UserSerializer,
      paginateParams.page,
      paginateParams.perPage,
      request
    );

    reply.send(paginatedUsers);
  }, request, reply);
};

export const show = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {
    const { id } = request.params;
    const user = await User.findByPk(id);
    if (user) {
      const responseData = UserSerializer.serialize(user);
      reply.send(responseData);
    } else {
      render404Error(request, reply)
    }
  }, request, reply);
};

export const create = async (request: FastifyRequest<{ Body: { displayName: string; emojicon: string } }>, reply: FastifyReply) => {
  await renderJson(async () => {

    const { displayName, emojicon } = request.body;
    const user = await User.create({ displayName, emojicon });
    const responseData: JsonApiResponseType<IUserSerializer> = UserSerializer.serialize(user);

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
      const resonseData: JsonApiResponseType<IUserSerializer> = UserSerializer.serialize(user);
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
