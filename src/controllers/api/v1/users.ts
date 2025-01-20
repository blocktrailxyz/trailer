import { FastifyReply, FastifyRequest } from 'fastify';
import User from 'models/user';
import { IUserSerializer, UserSerializer } from 'serializers/user';
import { JsonApiResponse } from 'types/json_api_response';

export const index = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await User.findAll();
  const responseData = UserSerializer.serialize(users);
  reply.send(responseData);
};

export const show = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const user = await User.findByPk(request.params.id);
  if (user) {
    const responseData = UserSerializer.serialize(user);
    reply.send(responseData);
  } else {
    reply.status(404).send({ error: 'User not found' });
  }
};

export const create = async (request: FastifyRequest<{ Body: { name: string; email: string } }>, reply: FastifyReply) => {
  const { name, email } = request.body;
  const user = await User.create({ name, email });
  const responseData: JsonApiResponse<IUserSerializer> = UserSerializer.serialize(user);

  reply.status(201).send(responseData);
};

export const update = async (request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>, reply: FastifyReply) => {
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
};

export const destroy = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params;

  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    reply.status(204).send();
  } else {
    reply.status(404).send({ error: 'User not found' });
  }
};
